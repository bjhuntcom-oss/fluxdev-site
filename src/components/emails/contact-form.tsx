import { Html, Head, Preview, Body, Container, Section, Text, Button, Hr, Row, Column } from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  company?: string;
  type: string;
  budget?: string;
  message: string;
}

export function ContactFormEmail({
  name,
  email,
  company,
  type,
  budget,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head>
        <title>Nouveau message de contact - FluxDev</title>
        <Preview>
          Message de {name} ({email}) - {type} - FluxDev
        </Preview>
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>🚀 FluxDev</Text>
            <Text style={title}>Nouveau message de contact</Text>
            <Text style={subtitle}>
              Un client potentiel vous a contacté via le formulaire du site web
            </Text>
          </Section>

          <Section style={content}>
            <Row style={infoRow}>
              <Column style={infoColumn}>
                <Text style={label}>Nom complet</Text>
                <Text style={value}>{name}</Text>
              </Column>
              <Column style={infoColumn}>
                <Text style={label}>Email</Text>
                <Text style={value}>{email}</Text>
              </Column>
            </Row>

            {(company || type || budget) && (
              <>
                <Row style={infoRow}>
                  {company && (
                    <Column style={infoColumn}>
                      <Text style={label}>Entreprise</Text>
                      <Text style={value}>{company}</Text>
                    </Column>
                  )}
                  {type && (
                    <Column style={infoColumn}>
                      <Text style={label}>Type de projet</Text>
                      <Text style={value}>{type}</Text>
                    </Column>
                  )}
                  {budget && (
                    <Column style={infoColumn}>
                      <Text style={label}>Budget estimé</Text>
                      <Text style={value}>{budget}</Text>
                    </Column>
                  )}
                </Row>
              </>
            )}

            <Hr style={hr} />

            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Cet email a été généré automatiquement depuis le formulaire de contact de FluxDev.
            </Text>
            <Text style={footerText}>
              Date: {new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
};

const header = {
  backgroundColor: "#000000",
  padding: "30px",
  textAlign: "center" as const,
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
};

const logo = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#ffffff",
  margin: "0 0 10px 0",
};

const title = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0 0 5px 0",
};

const subtitle = {
  fontSize: "16px",
  color: "#cccccc",
  margin: "0",
};

const content = {
  padding: "30px",
  backgroundColor: "#ffffff",
};

const infoRow = {
  marginBottom: "20px",
};

const infoColumn = {
  width: "50%",
  padding: "0 10px",
};

const label = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#666666",
  textTransform: "uppercase" as const,
  marginBottom: "5px",
};

const value = {
  fontSize: "16px",
  color: "#333333",
  margin: "0",
};

const hr = {
  border: "none",
  borderTop: "1px solid #e5e7eb",
  margin: "20px 0",
};

const messageText = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333333",
  whiteSpace: "pre-wrap" as const,
};

const footer = {
  padding: "20px 30px",
  backgroundColor: "#f8f9fa",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
};

const footerText = {
  fontSize: "12px",
  color: "#666666",
  textAlign: "center" as const,
  marginBottom: "5px",
};
