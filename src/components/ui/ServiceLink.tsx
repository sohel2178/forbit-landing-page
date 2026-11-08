"use client";

import type { ReactNode } from "react";

import { SELECT_SERVICE_EVENT } from "@/config/contact";
import type { ServiceValue } from "@/types";

interface ServiceLinkProps {
  service: ServiceValue;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

/**
 * Anchor to the contact section that also pre-selects a service in the form.
 * Works without JavaScript as a plain #contact link.
 */
export function ServiceLink({ service, className, children, ...rest }: ServiceLinkProps) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent<ServiceValue>(SELECT_SERVICE_EVENT, { detail: service }),
        );
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
