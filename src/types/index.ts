import type { LucideIcon } from "lucide-react";

export type SectionId =
  | "home"
  | "about"
  | "services"
  | "products"
  | "innovation"
  | "why-forbit"
  | "technologies"
  | "process"
  | "contact";

export type NavSectionId = "home" | "about" | "services" | "products" | "innovation" | "contact";

export interface NavItem {
  id: NavSectionId;
}

export type SocialPlatform = "facebook" | "linkedin" | "youtube";

export interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Value used by the contact form's "Interested Service" dropdown. */
export type ServiceValue =
  | "vehicle-tracking"
  | "iot-solutions"
  | "software-development"
  | "hardware-engineering"
  | "smart-bms"
  | "other";

export interface Service {
  index: string;
  slug: Exclude<ServiceValue, "smart-bms" | "other">;
  title: string;
  description: string;
  capabilities: string[];
  icon: LucideIcon;
}

export interface Product {
  id: "sultan-tracker" | "tiktiki";
  name: string;
  category: string;
  description: string[];
  features: string[];
  cta: string;
  /** Accessible description of the illustrative product visual. */
  visualAria: string;
  /** External product website. `null` until an official URL is supplied. */
  url: string | null;
  /** Brand accent used only inside the product's own showcase. */
  accent: string;
}

export interface InnovationFeature {
  title: string;
  points: string[];
  icon: LucideIcon;
}

export interface Reason {
  index: string;
  title: string;
  description: string;
}

export interface TechGroup {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
}
