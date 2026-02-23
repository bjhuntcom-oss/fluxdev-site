import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fluxdev.io";
  
  const routes = [
    "",
    "/projets",
    "/equipe",
    "/contact",
    "/services/developpement-web",
    "/services/applications-mobile",
    "/services/solutions-saas",
    "/services/cybersecurite",
    "/services/design-ui-ux",
    "/mentions-legales",
    "/confidentialite",
    "/cgv",
  ];

  const projectSlugs = [
    "ecommerce-luxe",
    "app-bancaire",
    "portail-citoyens",
    "app-telemedecine",
    "crm-ia",
    "marketplace-b2b",
    "plateforme-sirh",
    "agence-immobiliere",
    "app-fidelite",
    "plateforme-elearning",
  ];

  return [
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}${route}`,
          en: `${baseUrl}${route}`,
        },
      },
    })),
    ...projectSlugs.map((slug) => ({
      url: `${baseUrl}/projets/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
