import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Explore() {
  const cards = [
    {
      title: "About Us",
      description: "Discover our story, values, and commitment to great service.",
      link: "/about",
      image: "/images/about-us.jpg",
      buttonText: "About Us",
    },
    {
      title: "Our Deliveries",
      description: "Learn about our fast and reliable delivery services.",
      link: "/deliveries",
      image: "/images/deliveries.jpg",
      buttonText: "Delivery Info",
    },
    {
      title: "Explore Products",
      description: "Browse our wide range of products.",
      link: "/products",
      image: "/images/products.jpg",
      buttonText: "View Products",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative h-96 rounded-[1.618rem] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Background Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#59a8ff' }}>{card.title}</h3>
                <p className="mb-4">{card.description}</p>
                <Link
                  href={card.link}
                  className="inline-flex font-bold items-center justify-center 
                  gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border 
                  border-white/30 hover:bg-white/30 transition-all hover:gap-3">
                  {card.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
