import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
  Send,
  MessageCircleMore,
  Focus,
} from "lucide-react";

export const homepage = {
  hero: {
    badge: "✨ New Collection 2026",

    title: "Elevate Your Everyday Style",

    subtitle:
      "Discover premium essentials designed with timeless craftsmanship, unmatched comfort, and modern elegance.",

    primaryButton: {
      text: "Shop Now",
      href: "/shop",
    },

    secondaryButton: {
      text: "Explore Collection",
      href: "/shop",
    },

    image: "/images/hero/hero.jpeg",
  },
  categories: [
    {
      id: 1,
      name: "Men",
      slug: "men",
      image: "/images/categories/men.jpg",
    },
    {
      id: 2,
      name: "Women",
      slug: "women",
      image: "/images/categories/women.jpg",
    },
    {
      id: 3,
      name: "Accessories",
      slug: "accessories",
      image: "/images/categories/accessories.jpg",
    },
    {
      id: 4,
      name: "Footwear",
      slug: "footwear",
      image: "/images/categories/footwear.jpeg",
    },
  ],
  featuredProducts: [],
  featuredBanner: {
    badge: "NEW COLLECTION",

    title: "Crafted for Everyday Living",

    description:
      "Explore timeless pieces designed with quality, comfort, and simplicity in mind.",

    buttonText: "Shop Collection",

    buttonLink: "/shop",

    image: "/images/banner/banner.avif",
  },
  newArrivals: [
    {
      id: 11,
      slug: "premium-brown-wallet",

      brand: "Urban Craft",

      name: "Premium Brown Leather Wallet",

      price: 2299,

      compareAtPrice: 2699,

      images: [
        "/images/products/wallet1.webp",
        "/images/products/wallet2.webp",
      ],
    },

    {
      id: 12,
      slug: "canvas-backpack",

      brand: "Urban Craft",

      name: "Canvas Travel Backpack",

      price: 4999,

      compareAtPrice: 5799,

      images: ["/images/products/bag1.webp", "/images/products/bag2.webp"],
    },

    {
      id: 13,
      slug: "minimal-watch",

      brand: "Urban Craft",

      name: "Minimal Analog Watch",

      price: 7999,

      compareAtPrice: 8999,

      images: ["/images/products/watch1.webp", "/images/products/watch2.webp"],
    },

    {
      id: 14,
      slug: "wireless-speaker",

      brand: "Urban Craft",

      name: "Portable Bluetooth Speaker",

      price: 3499,

      compareAtPrice: 3999,

      images: [
        "/images/products/speaker1.webp",
        "/images/products/speaker2.webp",
      ],
    },
  ],
  whyChooseUs: [
    {
      id: 1,
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on eligible orders across India.",
    },

    {
      id: 2,
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "Trusted payment methods with encrypted checkout.",
    },

    {
      id: 3,
      icon: RotateCcw,
      title: "Easy Returns",
      description: "Hassle-free returns within our return policy.",
    },

    {
      id: 4,
      icon: Headset,
      title: "Customer Support",
      description: "Friendly support whenever you need assistance.",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Aarav Sharma",

      location: "Ahmedabad",

      image: "/images/testimonials/user1.jpg",

      rating: 5,

      review:
        "The product quality is outstanding. Everything from packaging to delivery felt premium. Highly recommended!",
    },

    {
      id: 2,
      name: "Priya Patel",

      location: "Mumbai",

      image: "/images/testimonials/user2.webp",

      rating: 5,

      review:
        "Beautiful craftsmanship and excellent customer support. I loved the overall shopping experience.",
    },

    {
      id: 3,
      name: "Rahul Verma",

      location: "Delhi",

      image: "/images/testimonials/user3.jpeg",

      rating: 5,

      review:
        "Exactly as shown on the website. Fast shipping, premium quality, and great attention to detail.",
    },
  ],
  ctaBanner: {
    badge: "READY TO SHOP",

    title: "Discover Products You'll Love",

    description:
      "Browse our carefully curated collection and find products crafted with quality, elegance, and attention to detail.",

    primaryButton: {
      text: "Shop Collection",
      href: "/shop",
    },

    secondaryButton: {
      text: "Contact Us",
      href: "/contact",
    },
  },
  footer: {
    description:
      "Crafting premium products designed with quality, simplicity, and timeless style.",

    columns: [
      {
        title: "Shop",

        links: [
          { label: "Shop", href: "/shop" },
          { label: "New Arrivals", href: "/shop?sort=newest" },
          { label: "Categories", href: "/categories" },
          { label: "Sale", href: "/sale" },
        ],
      },

      {
        title: "Company",

        links: [
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms & Conditions", href: "/terms" },
        ],
      },

      {
        title: "Support",

        links: [
          { label: "FAQs", href: "/faq" },
          { label: "Shipping", href: "/shipping" },
          { label: "Returns", href: "/returns" },
          { label: "Track Order", href: "/track-order" },
        ],
      },
    ],

    contact: {
      address: "Ahmedabad, Gujarat",

      phone: "+91 9876543210",

      email: "hello@yourbrand.com",
    },

    socials: [
      {
        icon: Send,
        href: "#",
      },

      {
        icon: MessageCircleMore,
        href: "#",
      },

      {
        icon: Focus,
        href: "#",
      },
    ],
  },
};
