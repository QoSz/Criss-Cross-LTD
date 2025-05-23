"use client";

interface OrganizationSchemaProps {
  organization?: {
    name?: string;
    url?: string;
    logo?: string;
    description?: string;
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
    contactPoint?: {
      telephone?: string;
      contactType?: string;
      email?: string;
    };
  };
}

export function OrganizationSchema({ organization }: OrganizationSchemaProps) {
  const defaultOrganization = {
    name: "Criss Cross Ltd",
    url: "https://www.crisscross.co.ke",
    logo: "https://www.crisscross.co.ke/cc-logos/CC-Logo.png",
    description: "Kenya's trusted wholesale FMCG distributor offering competitive prices on cooking oil, soaps, rice, sugar, water, juices and more. Reliable delivery across Nairobi and Kenya.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "Kenya"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Swahili"]
    },
  };

  const org = { ...defaultOrganization, ...organization };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.crisscross.co.ke/#organization",
    name: org.name,
    url: org.url,
    logo: {
      "@type": "ImageObject",
      url: org.logo,
      width: 300,
      height: 60
    },
    description: org.description,
    address: org.address,
    contactPoint: org.contactPoint,
    areaServed: {
      "@type": "Country",
      name: "Kenya"
    },
    knowsAbout: [
      "Wholesale Distribution",
      "FMCG Products",
      "Fast Moving Consumer Goods",
      "Cooking Oil",
      "Household Products",
      "Food Products",
      "Supply Chain Management"
    ],
    memberOf: {
      "@type": "Organization",
      name: "Kenya Association of Manufacturers"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.crisscross.co.ke/#website",
    url: "https://www.crisscross.co.ke",
    name: "Criss Cross Ltd",
    description: "Kenya's trusted wholesale FMCG distributor",
    publisher: {
      "@id": "https://www.crisscross.co.ke/#organization"
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.crisscross.co.ke/products?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 