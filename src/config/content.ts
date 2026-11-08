import {
  Activity,
  AppWindow,
  BatteryCharging,
  Boxes,
  CircuitBoard,
  Cloud,
  Code,
  Cpu,
  Lightbulb,
  MapPinned,
  Network,
  PenTool,
  Power,
  Radio,
  Rocket,
  Satellite,
  Server,
  Thermometer,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { formatIndex } from "@/i18n/format";
import type {
  Capability,
  InnovationFeature,
  ProcessStep,
  Product,
  Reason,
  Service,
  TechGroup,
} from "@/types";

/*
 * Structure, icons, links and technical names live here.
 * All human-readable copy lives in src/i18n/dictionaries/*.
 */

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
const capabilityIcons: LucideIcon[] = [Cpu, Radio, Code, Network];

export function getCapabilities(dict: Dictionary): Capability[] {
  return dict.about.capabilities.map((c, i) => ({ ...c, icon: capabilityIcons[i] }));
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
const serviceStructure: { slug: Service["slug"]; icon: LucideIcon }[] = [
  { slug: "vehicle-tracking", icon: MapPinned },
  { slug: "iot-solutions", icon: CircuitBoard },
  { slug: "software-development", icon: AppWindow },
  { slug: "hardware-engineering", icon: Cpu },
];

export function getServices(dict: Dictionary, locale: Locale): Service[] {
  return serviceStructure.map(({ slug, icon }, i) => ({
    slug,
    icon,
    index: formatIndex(i + 1, locale),
    ...dict.services.items[slug],
  }));
}

/* ------------------------------------------------------------------ */
/*  Products (separate brands — names are never translated)            */
/* ------------------------------------------------------------------ */
const productStructure: Pick<Product, "id" | "name" | "url" | "accent">[] = [
  {
    id: "sultan-tracker",
    name: "Sultan Tracker",
    url: "https://sultantracker.com",
    accent: "#E0A93B",
  },
  {
    id: "tiktiki",
    name: "Tiktiki GPS Tracker",
    /** Official website not supplied yet — set NEXT_PUBLIC_TIKTIKI_URL when available. */
    url: process.env.NEXT_PUBLIC_TIKTIKI_URL || null,
    accent: "#1FB5C4",
  },
];

export function getProducts(dict: Dictionary): Product[] {
  return productStructure.map((p) => ({ ...p, ...dict.products.items[p.id] }));
}

/** Locale-independent product brand list (footer, JSON-LD). */
export const productBrands = productStructure;

/* ------------------------------------------------------------------ */
/*  Innovation — Smart BMS (in development)                            */
/* ------------------------------------------------------------------ */
const innovationIcons: LucideIcon[] = [
  Satellite,
  Activity,
  Thermometer,
  Power,
  BatteryCharging,
  Cloud,
];

export function getInnovationFeatures(dict: Dictionary): InnovationFeature[] {
  return dict.innovation.features.map((f, i) => ({ ...f, icon: innovationIcons[i] }));
}

/* ------------------------------------------------------------------ */
/*  Why FORBIT                                                         */
/* ------------------------------------------------------------------ */
export function getReasons(dict: Dictionary, locale: Locale): Reason[] {
  return dict.why.items.map((r, i) => ({ ...r, index: formatIndex(i + 1, locale) }));
}

/* ------------------------------------------------------------------ */
/*  Technologies (item names are technical terms — not translated)     */
/* ------------------------------------------------------------------ */
const techStructure: { icon: LucideIcon; items: string[] }[] = [
  {
    icon: CircuitBoard,
    items: [
      "ESP32",
      "Microcontrollers",
      "Embedded C/C++",
      "MicroPython",
      "Sensor Integration",
      "Firmware Development",
    ],
  },
  {
    icon: Radio,
    items: ["GPS / GNSS", "4G / LTE", "TCP/IP", "MQTT", "RS485", "CAN Bus", "UART"],
  },
  {
    icon: Boxes,
    items: ["Next.js", "React", "Node.js", "Android Development", "REST APIs", "Real-Time Applications"],
  },
  {
    icon: Server,
    items: [
      "MongoDB",
      "Redis",
      "Firebase",
      "Docker",
      "Linux",
      "Cloud Infrastructure",
      "Distributed Systems",
    ],
  },
];

export function getTechGroups(dict: Dictionary): TechGroup[] {
  return techStructure.map((g, i) => ({ ...g, title: dict.tech.groups[i] }));
}

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */
const processIcons: LucideIcon[] = [Lightbulb, PenTool, Wrench, Rocket];

export function getProcessSteps(dict: Dictionary, locale: Locale): ProcessStep[] {
  return dict.process.steps.map((s, i) => ({
    ...s,
    icon: processIcons[i],
    index: formatIndex(i + 1, locale),
  }));
}
