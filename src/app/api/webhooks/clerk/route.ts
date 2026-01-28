import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return new Response('Missing webhook secret', { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  const supabase = createAdminSupabaseClient();

  switch (evt.type) {
    case 'user.created': {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      const primaryEmail = email_addresses[0]?.email_address;

      if (primaryEmail) {
        const { error } = await supabase.from('users').insert({
          clerk_id: id,
          email: primaryEmail,
          first_name: first_name || null,
          last_name: last_name || null,
          avatar_url: image_url || null,
          role: 'user',
          status: 'active',
          features_unlocked: true,
        });

        if (error) {
          console.error('Error creating user:', error);
          return new Response('Error creating user', { status: 500 });
        }
      }
      break;
    }

    case 'user.updated': {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      const primaryEmail = email_addresses[0]?.email_address;

      const { error } = await supabase
        .from('users')
        .update({
          email: primaryEmail,
          first_name: first_name || null,
          last_name: last_name || null,
          avatar_url: image_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('clerk_id', id);

      if (error) {
        console.error('Error updating user:', error);
        return new Response('Error updating user', { status: 500 });
      }
      break;
    }

    case 'user.deleted': {
      const { id } = evt.data;

      const { error } = await supabase.from('users').delete().eq('clerk_id', id);

      if (error) {
        console.error('Error deleting user:', error);
        return new Response('Error deleting user', { status: 500 });
      }
      break;
    }

    case 'session.created': {
      const { user_id } = evt.data;

      await supabase
        .from('users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('clerk_id', user_id);
      break;
    }
  }

  return new Response('Webhook processed', { status: 200 });
}
