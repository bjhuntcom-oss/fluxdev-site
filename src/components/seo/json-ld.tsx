export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FluxDev",
    url: "https://fluxdev.io",
    logo: "https://fluxdev.io/icon.svg",
    description: "Agence de développement web, mobile, SaaS et cybersécurité propulsée par plus de 1500 agents IA propriétaires.",
    foundingDate: "2024",
    sameAs: [
      "https://linkedin.com/company/fluxdev",
      "https://twitter.com/fluxdev",
      "https://github.com/fluxdev",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["French", "English"],
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 48.8566,
        longitude: 2.3522,
      },
      geoRadius: "10000",
    },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "SaaS Solutions",
      "Cybersecurity",
      "Artificial Intelligence",
      "UI/UX Design",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FluxDev",
    url: "https://fluxdev.io",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fluxdev.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["fr-FR", "en-US"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceJsonLd({ 
  name, 
  description,
  locale = "fr"
}: { 
  name: string; 
  description: string;
  locale?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: "FluxDev",
      url: "https://fluxdev.io",
    },
    areaServed: "Worldwide",
    availableLanguage: ["French", "English"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
