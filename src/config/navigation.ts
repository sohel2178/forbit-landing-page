import type { NavItem } from "@/types";

/** In-page sections shown in the main navigation (labels live in the dictionaries). */
export const mainNav: NavItem[] = [
  { id: "home" },
  { id: "about" },
  { id: "services" },
  { id: "products" },
  { id: "innovation" },
  { id: "contact" },
];

/** Footer "Company" links → keys of `dict.footer.companyLinks`. */
export const footerCompanyNav = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#products", key: "products" },
  { href: "#innovation", key: "innovation" },
  { href: "#contact", key: "contact" },
] as const;
