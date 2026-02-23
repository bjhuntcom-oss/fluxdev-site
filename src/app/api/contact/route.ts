import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormEmail } from "@/components/emails/contact-form";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(100, "Le nom ne peut pas dépasser 100 caractères"),
  email: z.string().email("Veuillez fournir un email valide"),
  company: z.string().optional(),
  type: z.string().min(1, "Veuillez sélectionner un type de projet"),
  budget: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    
    const validatedData = contactSchema.parse(body);
    
    const { name, email, company, type, budget, message } = validatedData;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "FluxDev <contact@bjhunt.com>",
      to: ["bjhuntcom@gmail.com"],
      subject: `Nouveau message de contact - ${name} (${type})`,
      replyTo: email,
      react: ContactFormEmail({
        name,
        email,
        company: company || undefined,
        type,
        budget: budget || undefined,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer plus tard." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.",
        data 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact API error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Données invalides", 
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: "API de contact FluxDev - POST uniquement",
      endpoint: "/api/contact",
      method: "POST",
      description: "Envoyer un email de contact via Resend"
    },
    { status: 200 }
  );
}
