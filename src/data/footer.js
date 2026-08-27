import {
  Send,
  MessageCircleMore,
  Focus,
} from "lucide-react";

export const footer = {
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
};
