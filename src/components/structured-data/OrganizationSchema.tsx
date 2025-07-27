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

export function LocalBusinessSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.crisscross.co.ke/#localbusiness",
    name: "Criss Cross Ltd",
    image: "https://www.crisscross.co.ke/cc-logos/CC-Logo.png",
    description: "Kenya's trusted wholesale FMCG distributor offering competitive prices on cooking oil, soaps, rice, sugar, water, juices and more. Reliable delivery across Nairobi and Kenya.",
    url: "https://www.crisscross.co.ke",
    telephone: "+254707451536",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "Kenya"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.286389,
      longitude: 36.817223
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "13:00"
      }
    ],
    areaServed: {
      "@type": "Country",
      name: "Kenya"
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -1.286389,
        longitude: 36.817223
      },
      geoRadius: "500000"
    },
    makesOffer: {
      "@type": "Offer",
      category: "Wholesale Distribution",
      itemOffered: {
        "@type": "Service",
        name: "Wholesale FMCG Distribution",
        description: "Bulk distribution of fast moving consumer goods including cooking oil, soaps, rice, sugar, beverages, and household products"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description?: string;
  image?: string;
  category?: string;
  brand?: string;
  availability?: string;
}

export function ProductSchema({ name, description, image, category, brand, availability = "InStock" }: ProductSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description || `Wholesale ${name} available at competitive prices from Criss Cross Ltd, Kenya's trusted FMCG distributor`,
    image: image,
    category: category,
    brand: {
      "@type": "Brand",
      name: brand || "Various Brands"
    },
    offers: {
      "@type": "Offer",
      availability: `https://schema.org/${availability}`,
      priceCurrency: "KES",
      seller: {
        "@type": "Organization",
        name: "Criss Cross Ltd",
        url: "https://www.crisscross.co.ke"
      },
      businessFunction: "http://purl.org/goodrelations/v1#Sell",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: 1,
        unitText: "Bulk Orders"
      }
    },
    manufacturer: {
      "@type": "Organization",
      name: brand || "Various Manufacturers"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 