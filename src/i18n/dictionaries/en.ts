/**
 * English copy. This file defines the dictionary shape — every other locale
 * must satisfy `Dictionary` (missing keys fail the TypeScript check).
 *
 * Brand names and technical terms (ESP32, MQTT, Next.js…) live in
 * src/config/content.ts and are intentionally not translated.
 */
const en = {
  meta: {
    title: "FORBIT LIMITED | IoT, GPS Tracking & Software Engineering",
    description:
      "FORBIT LIMITED develops intelligent IoT solutions, GPS tracking platforms, customized hardware, and innovative software applications in Bangladesh.",
    ogAlt: "FORBIT LIMITED — Engineering Intelligence. Connecting Tomorrow.",
    ogTagline: "IoT · GPS Tracking · Hardware · Software",
  },

  common: {
    country: "Bangladesh",
    newTab: "(opens in a new tab)",
    skipToContent: "Skip to content",
    language: "Language",
  },

  theme: {
    label: "Theme",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
  },

  nav: {
    items: {
      home: "Home",
      about: "About",
      services: "Services",
      products: "Products",
      innovation: "Innovation",
      contact: "Contact",
    },
    letsTalk: "Let's Talk",
    homeAria: "FORBIT LIMITED — back to top",
    primaryLabel: "Primary",
    mobileLabel: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    siteMenu: "Site menu",
  },

  hero: {
    trust: "Technology & Engineering Company | Bangladesh",
    headline: ["Engineering Intelligence.", "Connecting Tomorrow."],
    subheadline: "Where Hardware Meets Intelligence.",
    description:
      "From intelligent IoT devices to advanced GPS tracking platforms and custom software, we engineer connected solutions that move businesses forward.",
    primaryCta: "Explore Our Solutions",
    secondaryCta: "Start a Project",
    stackLabel: "Engineering stack",
    stack: ["Hardware", "Firmware", "Connectivity", "Cloud", "Applications"],
    scroll: "Scroll",
    scrollAria: "Scroll to About section",
    visual: {
      aria: "Illustration of an embedded core connected by circuit traces to cloud, GPS, energy, sensor, network and mobile app nodes",
      nodes: {
        cloud: "Cloud",
        gps: "GPS",
        battery: "Energy",
        app: "App",
        sensor: "Sensor",
        net: "Network",
      },
      telemetry: "Telemetry streaming",
      link: "Device ↔ Cloud",
    },
  },

  about: {
    label: "Who We Are",
    headline: { lead: "We Don't Just Build Software.", accent: "We Engineer Solutions." },
    paragraphs: [
      "FORBIT LIMITED is a technology and engineering company dedicated to developing intelligent solutions that connect the physical and digital worlds.",
      "Our expertise spans GPS tracking, IoT hardware, embedded systems, software engineering, and cloud-connected platforms.",
      "We believe technology should solve real problems, simplify operations, and create meaningful impact.",
    ],
    capabilities: [
      {
        title: "Hardware Engineering",
        description: "Custom electronics and circuit design built for real-world conditions.",
      },
      {
        title: "IoT & Embedded Systems",
        description: "Firmware and microcontroller platforms that make devices intelligent.",
      },
      {
        title: "Software & Application Development",
        description: "Web, mobile, and backend platforms that scale with your operations.",
      },
      {
        title: "Connected Intelligence",
        description: "Devices, cloud, and data working together as one system.",
      },
    ],
    visual: {
      title: "System Architecture",
      status: "Connected",
      aria: "Diagram: a custom hardware device sends data over LTE and MQTT to the cloud, which serves a web dashboard and a mobile app",
      caption: "Hardware · Connectivity · Cloud · Applications",
    },
  },

  services: {
    label: "What We Do",
    headline: "Technology Built Around Your Vision.",
    description:
      "We combine engineering expertise and software innovation to deliver customized solutions for complex business challenges.",
    tagline: "04 Disciplines · One Team",
    explore: "Explore service",
    exploreAria: "Explore service:",
    items: {
      "vehicle-tracking": {
        title: "Vehicle Tracking Solutions",
        description:
          "Advanced GPS tracking and fleet management platforms designed to improve vehicle visibility, security, and operational efficiency.",
        capabilities: [
          "Real-time GPS tracking",
          "Fleet management",
          "Vehicle monitoring",
          "Intelligent alerts",
          "Remote device management",
          "Location history and reporting",
          "GPS hardware integration",
        ],
      },
      "iot-solutions": {
        title: "Customized IoT Solutions",
        description:
          "We design and develop customized Internet of Things solutions, transforming physical devices into intelligent connected systems.",
        capabilities: [
          "Custom IoT hardware",
          "Embedded systems",
          "ESP32 and microcontroller development",
          "Sensor integration",
          "Firmware development",
          "Wireless connectivity",
          "Real-time monitoring",
          "Device automation",
        ],
      },
      "software-development": {
        title: "Software & Application Development",
        description:
          "Scalable software platforms and applications that help businesses automate operations and deliver better digital experiences.",
        capabilities: [
          "Next.js web applications",
          "Android applications",
          "Backend API development",
          "Database architecture",
          "Cloud infrastructure",
          "Real-time applications",
          "Business management systems",
          "System integrations",
        ],
      },
      "hardware-engineering": {
        title: "Hardware & Embedded Engineering",
        description:
          "From electronic circuit design to intelligent firmware, we build hardware solutions that connect technology with the real world.",
        capabilities: [
          "Custom electronics",
          "PCB and hardware development",
          "Microcontroller programming",
          "Communication protocols",
          "Device integration",
          "Remote control systems",
          "Hardware-software integration",
        ],
      },
    },
    pipeline: [
      { label: "Sensors", sub: "Measure" },
      { label: "MCU · Firmware", sub: "Process" },
      { label: "Wireless", sub: "Transmit" },
      { label: "Cloud", sub: "Monitor" },
    ],
    routeMap: { title: "Live position", status: "Geofence · Inside" },
  },

  products: {
    label: "Our Products",
    headline: "Technology That Makes a Difference.",
    description:
      "We transform engineering expertise into practical technology products that solve real-world problems.",
    parentNote: { lead: "Independent product brands, engineered by", trail: "." },
    illustrative: "Illustrative concept",
    comingSoon: "website coming soon",
    items: {
      "sultan-tracker": {
        category: "GPS Tracking & Fleet Management",
        description: [
          "Sultan Tracker is an advanced GPS-based vehicle tracking and fleet management platform designed to provide businesses with complete visibility and control over their vehicle operations.",
          "With real-time monitoring, intelligent alerts, and comprehensive reporting, Sultan Tracker helps organizations manage their fleets more efficiently.",
        ],
        features: [
          "Live vehicle tracking",
          "Fleet management",
          "Real-time vehicle monitoring",
          "Intelligent alerts",
          "Vehicle history",
          "Reporting and analytics",
          "Remote GPS device management",
        ],
        cta: "Visit Sultan Tracker",
        visualAria:
          "Illustrative concept of a fleet tracking dashboard with a live map, vehicle list and alert",
      },
      tiktiki: {
        category: "Smart Vehicle Security & Tracking",
        description: [
          "Tiktiki GPS Tracker brings smart vehicle security and GPS tracking technology closer to everyday vehicle owners.",
          "Stay connected with your vehicle through intelligent location monitoring, security features, and real-time tracking capabilities.",
        ],
        features: [
          "Real-time GPS tracking",
          "Vehicle location monitoring",
          "Vehicle security",
          "Smart notifications",
          "Remote monitoring",
          "Location history",
        ],
        cta: "Explore Tiktiki",
        visualAria:
          "Illustrative concept of the Tiktiki mobile app showing a parked vehicle on a map with security mode enabled",
      },
    },
  },

  innovation: {
    label: "Future Innovation",
    headline: { lead: "Beyond Tracking.", accent: "Into Intelligent Energy." },
    projectLabel: "Project",
    projectName: "Smart Battery Management System",
    status: ["Coming Soon", "In Development"],
    description: [
      "We are developing an intelligent Smart Battery Management System that combines battery monitoring, GPS tracking, remote control, and cloud connectivity into one unified platform.",
      "Our goal is to make battery management smarter, more secure, and remotely accessible.",
    ],
    cta: "Follow Our Innovation",
    plannedTitle: "Planned Capabilities",
    notAvailable:
      "The Smart BMS is an upcoming development project and is not yet commercially available.",
    features: [
      {
        title: "Integrated GPS Tracking",
        points: ["Real-time battery location", "Remote device identification", "GPS monitoring"],
      },
      {
        title: "Intelligent Battery Monitoring",
        points: [
          "Battery voltage",
          "Charging and discharging current",
          "Battery capacity and status",
          "Battery health information",
        ],
      },
      {
        title: "Temperature Monitoring",
        points: [
          "Real-time temperature sensing",
          "Temperature-based alerts",
          "Thermal safety monitoring",
        ],
      },
      {
        title: "Remote Battery Output Control",
        points: [
          "Remotely enable or disable battery output",
          "Intelligent power management",
          "Remote control capabilities",
        ],
      },
      {
        title: "Charging & Discharging Management",
        points: [
          "Charging status",
          "Discharging status",
          "Power management",
          "Battery protection monitoring",
        ],
      },
      {
        title: "Cloud Connectivity",
        points: [
          "Continuous telemetry",
          "Remote monitoring dashboard",
          "Data visualization",
          "Device communication",
        ],
      },
    ],
    console: {
      title: "BMS Console",
      preview: "Concept preview",
      aria: "Concept battery management console with illustrative sample readings",
      sample: "Sample",
      soc: "State of charge",
      charging: "Charging · sample",
      voltage: "Voltage",
      current: "Current",
      charge: "Charge",
      discharge: "Discharge",
      temperature: "Temp",
      gps: "GPS",
      locationFix: "Location fix",
      output: "Output",
      enabled: "Enabled",
      remoteControl: "Remote control",
      cloud: "Cloud",
      telemetrySync: "Telemetry sync",
      disclaimer:
        "Concept interface for illustration only. All readings shown are sample values, not measured product performance. Features and specifications may change during development.",
    },
  },

  why: {
    label: "Why FORBIT",
    headline: { lead: "Engineering", accent: "Beyond", trail: "Expectations." },
    description: "One team across the full stack — from the circuit board to the cloud dashboard.",
    items: [
      {
        title: "End-to-End Engineering",
        description:
          "We combine hardware, firmware, connectivity, backend infrastructure, and frontend applications into complete solutions.",
      },
      {
        title: "Customized Development",
        description:
          "Every business has unique challenges. We develop technology tailored to specific requirements.",
      },
      {
        title: "Connected Intelligence",
        description:
          "We connect physical devices with cloud platforms to create intelligent, data-driven systems.",
      },
      {
        title: "Technical Support",
        description:
          "We provide continuous technical assistance, software improvements, and system maintenance.",
      },
    ],
  },

  tech: {
    label: "Capabilities",
    headline: "Built With Technology. Driven By Innovation.",
    description:
      "A full-stack engineering toolkit that spans silicon, signals, software, and infrastructure.",
    groups: [
      "IoT & Embedded Systems",
      "Connectivity & Communication",
      "Software Engineering",
      "Infrastructure & Data",
    ],
    groupAria: "technologies",
  },

  process: {
    label: "Our Engineering Process",
    headline: "From Idea to Intelligent Reality.",
    description: "A disciplined path from first conversation to a deployed, supported system.",
    stepLabel: "Step",
    steps: [
      {
        title: "Discover",
        description:
          "We understand your requirements, business objectives, and technical challenges.",
      },
      {
        title: "Design",
        description: "We design the architecture, hardware, software, and communication systems.",
      },
      { title: "Develop", description: "We engineer, integrate, and test the complete solution." },
      {
        title: "Deploy & Support",
        description:
          "We deploy the solution and provide ongoing technical support and improvements.",
      },
    ],
  },

  contact: {
    label: "Let's Build Something",
    headline: { lead: "Have an Idea?", accent: "Let's Engineer It." },
    description:
      "Whether you need a customized IoT device, a GPS tracking platform, or a complete software solution, FORBIT LIMITED is ready to help turn your vision into reality.",
    details: { email: "Email", phone: "Phone", location: "Location", address: "Address", hours: "Business Hours" },
    helpWith: "We can help with",
    formTitle: "Project Inquiry",
    formIntro: "Share a few details and our engineering team will review your requirements.",
    services: {
      "vehicle-tracking": "Vehicle Tracking Solutions",
      "iot-solutions": "Customized IoT Solutions",
      "software-development": "Software Development",
      "hardware-engineering": "Hardware Engineering",
      "smart-bms": "Smart Battery Management System",
      other: "Other",
    },
    form: {
      labels: {
        name: "Full Name",
        company: "Company Name",
        email: "Email Address",
        phone: "Phone Number",
        service: "Interested Service",
        details: "Project Details",
      },
      placeholders: {
        name: "Your full name",
        company: "Organization",
        email: "you@company.com",
        phone: "+880 …",
        service: "Select a service",
        details: "Tell us what you want to build, the problem you're solving, and any timelines.",
      },
      optional: "(optional)",
      phoneHint: "Include country code if outside Bangladesh.",
      requiredNote: "Required fields",
      submit: "Send Project Inquiry",
      sending: "Sending…",
      success: "Thank you — your inquiry has been sent. We'll get back to you soon.",
      notConfigured:
        "Online inquiries aren't connected yet, so your message was not sent. Your details are still in the form — please try again later.",
      invalid: "Please correct the highlighted fields.",
      failed: "We couldn't deliver your message right now. It was not sent — please try again shortly.",
      network: "Network error. Your message was not sent — please check your connection and try again.",
    },
    errors: {
      name: {
        required: "Please enter your full name.",
        tooShort: "Name looks too short.",
        tooLong: "Name is too long.",
      },
      company: { tooLong: "Company name is too long." },
      email: {
        required: "Please enter your email address.",
        invalid: "Please enter a valid email address.",
      },
      phone: { invalid: "Use digits only, optionally with +, spaces, or dashes." },
      service: {
        required: "Please choose a service.",
        invalid: "Please choose a valid service.",
      },
      details: {
        required: "Please tell us about your project.",
        tooShort: "Please add a little more detail (at least 20 characters).",
        tooLong: "Please keep it under 5000 characters.",
      },
    },
  },

  footer: {
    coreMessage: {
      lead: "From Intelligent Hardware to Connected Software —",
      accent: "We Engineer the Future.",
    },
    tagline: "Engineering intelligent solutions through IoT, software, and connected technologies.",
    countryLine: "Technology & Engineering · Bangladesh",
    columns: {
      company: "Company",
      brands: "Our Brands",
      services: "Services",
      social: "Social Media",
      contact: "Contact",
    },
    companyLinks: {
      about: "About Us",
      services: "Our Services",
      products: "Our Products",
      innovation: "Innovation",
      contact: "Contact",
    },
    serviceLinks: [
      "Vehicle Tracking",
      "IoT Engineering",
      "Software Development",
      "Hardware Engineering",
    ],
    soon: "soon",
    backToTop: "Back to top",
    copyright: "© 2026 FORBIT LIMITED. All Rights Reserved.",
  },
};

export type Dictionary = typeof en;
export default en;
