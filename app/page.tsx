"use client";

import {
  Mail,
  MapPin,
  Code2,
  Database,
  Wrench,
  Zap,
  Globe,
  Terminal,
  GraduationCap,
  Briefcase,
  GitFork,
  MessageCircle,
  Download,
  Gem,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  PopIn,
  AnimatedDivider,
  easeOutRefined,
} from "./components/animations";
import { NavScrollProgress } from "./components/nav-scroll-progress";
import {
  cardLiftAcademicProps,
  cardLiftEmeraldProps,
  cardLiftIndigoProps,
  contactCardLiftProps,
  linkTapProps,
  tagPopProps,
} from "./lib/motion-interaction";
import { useRef, useEffect } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    category: "Backend",
    icon: <Terminal size={18} />,
    items: ["Node.js", "Express", "TypeScript", "Java", "Spring Boot", "Prisma ORM", "BullMQ", "Zod"],
  },
  {
    category: "Frontend",
    icon: <Code2 size={18} />,
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "JavaScript", "HTML / CSS", "Bootstrap", "Recharts", "Thymeleaf"],
  },
  {
    category: "Móvil",
    icon: <Globe size={18} />,
    items: ["React Native", "Expo CLI"],
  },
  {
    category: "Bases de Datos",
    icon: <Database size={18} />,
    items: ["PostgreSQL", "SQL Server", "MongoDB", "Redis"],
  },
  {
    category: "APIs e Integraciones",
    icon: <Zap size={18} />,
    items: ["Meta WhatsApp Cloud API", "Anthropic Claude API", "Wompi", "Resend", "Firebase", "REST APIs", "JWT"],
  },
  {
    category: "Infraestructura y Deploy",
    icon: <Wrench size={18} />,
    items: ["Railway", "Vercel", "Docker"],
  },
  {
    category: "Herramientas",
    icon: <GitFork size={18} />,
    items: ["Git / GitHub", "Postman", "Power BI", "Jira", "Azure DevOps", "TestRail", "Cursor", "VS Code"],
  },
];

const ACADEMIC_PROJECTS = [
  {
    title: "Sistema de Administración de Parqueadero",
    tags: ["Java", "SQL Server", "Power BI", "ETL"],
    description: "Software de escritorio con base de datos relacional, bodega de datos (Data Warehouse), procesos ETL y visualización de métricas en Power BI para toma de decisiones.",
  },
  {
    title: "Aplicación Web — Gestión de Inventarios y Alquileres",
    tags: ["Java", "Spring Boot", "SQL Server", "CRUD"],
    description: "Sistema web con control de inventarios, trazabilidad de productos alquilados e integración con SQL Server. Enfocado en escalabilidad y organización del código.",
  },
  {
    title: "Aplicación Móvil para Restaurante",
    tags: ["React Native", "Expo CLI", "Firebase", "Auth"],
    description: "App móvil con autenticación, CRUD de productos y pedidos, usando Firebase como backend en tiempo real.",
  },
  {
    title: "Proyecto de Investigación — Metodologías Ágiles",
    tags: ["Scrum", "Kanban", "Análisis", "Métricas"],
    description: "Estudio comparativo de Scrum y Kanban en empresas colombianas, analizando eficiencia de equipos y aplicación de métricas.",
  },
  {
    title: "Gestión del Ciclo de Vida del Software",
    tags: ["Documentación", "Mantenimiento", "SDLC"],
    description: "Manuales de usuario, documentación técnica, planes de despliegue y estrategias de mantenimiento correctivo, preventivo, predictivo y adaptativo.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a0f]/75">
      <NavScrollProgress disabled={prefersReducedMotion === true} />
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-indigo-400 font-semibold tracking-wide hover:text-violet-400 transition-colors duration-200">EV</a>
        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
          {["Sobre mí", "FlowsFy", "ViveStone", "Proyectos", "Habilidades", "Contacto"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="nav-link hover:text-violet-400">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 80, damping: 20 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }

  // GSAP posee la entrada de .hero-intro-line; el brillo del cursor sigue en Framer (mismo Hero, otro nodo).
  useGSAP(
    () => {
      const root = heroContentRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const lines = q(".hero-intro-line");
      if (!lines.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(lines, { opacity: 1, y: 0, clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform",
          }
        );
      });

      return () => {
        mm.revert();
      };
    },
    { scope: heroContentRef, dependencies: [] }
  );

  const tap = linkTapProps(prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
      className="relative min-h-screen flex items-center justify-center hero-glow px-6 py-12 sm:py-16 overflow-hidden"
    >
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            left: x,
            top: y,
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
          }}
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={heroContentRef} className="relative max-w-3xl mx-auto text-center">
        <h1 className="hero-intro-line text-5xl sm:text-7xl font-bold tracking-tight mb-4 text-white">
          Emmanuel
          <br />
          <span className="gradient-text">Villegas Urrea</span>
        </h1>

        <p className="hero-intro-line text-xl sm:text-2xl text-slate-400 mb-3 font-light">
          Desarrollador Full-Stack
        </p>

        <p className="hero-intro-line text-base text-slate-500 mb-8">
          Fundador de <span className="text-violet-400 font-medium">FlowsFy</span> · Ingeniería de Software · Semestre 7
        </p>

        <div className="hero-intro-line flex items-center justify-center gap-2 text-slate-500 text-sm mb-10">
          <MapPin size={14} />
          <span>Medellín, Colombia</span>
        </div>

        <div className="hero-intro-line flex items-center justify-center gap-4 flex-wrap">
          <motion.a
            href="https://www.linkedin.com/in/villegas-emmanuel31/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
            {...tap}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </motion.a>
          <motion.a
            href="https://github.com/SoyKzeta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 text-sm font-medium transition-colors duration-200"
            {...tap}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </motion.a>
          <motion.a
            href="mailto:emmanuelville@hotmail.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 text-sm font-medium transition-colors duration-200"
            {...tap}
          >
            <Mail size={16} />
            Contactar
          </motion.a>
          <motion.a
            href="/cv/Emmanuel_Villegas_CV.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 text-sm font-medium transition-colors duration-200"
            {...tap}
          >
            <Download size={16} />
            Descargar CV
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function AboutMe() {
  return (
    <section id="sobre-mí" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <SectionLabel icon={<MessageCircle size={14} />} label="Sobre mí" />
          <h2 className="text-3xl font-bold text-white mb-8">Perfil profesional</h2>
        </FadeUp>

        <StaggerContainer className="space-y-4 text-slate-400 leading-relaxed text-[15px]">
          <StaggerItem>
            <p>
              Estudiante de{" "}
              <span className="text-slate-200 font-medium">Ingeniería de Software (Semestre 7)</span>{" "}
              en el Tecnológico de Antioquia, con perfil full-stack y enfoque en el desarrollo de productos digitales de impacto real.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              Actualmente soy fundador y desarrollador principal de{" "}
              <span className="text-violet-400 font-medium">FlowsFy</span>, una plataforma SaaS multitenant que integra inteligencia artificial para automatizar la atención al cliente por WhatsApp, gestión de inventario, pedidos y facturación electrónica para tiendas físicas.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              Cuento con experiencia práctica en arquitectura de software, APIs REST, integraciones con servicios externos (Meta WhatsApp Cloud API, Anthropic Claude, Wompi, Resend) y sistemas asíncronos con colas de mensajes (BullMQ + Redis). Me caracterizo por pensamiento orientado al producto, capacidad para tomar decisiones técnicas de arquitectura y un enfoque en construir soluciones escalables, mantenibles y de impacto real.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              También desarrollé de punta a punta el sitio web de{" "}
              <span className="text-slate-200 font-medium">ViveStone</span>{" "}
              (cuarzos y sinterizados premium), con catálogo, galería, base de datos, APIs propias e integraciones con servicios externos para el flujo de contacto y cotización.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <StaggerContainer className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4" delay={0.2}>
          {[
            { label: "Semestre actual", value: "7°" },
            { label: "Institución", value: "Tecnológico de Antioquia" },
            { label: "Idiomas", value: "Español · Inglés A2" },
          ].map((item) => (
            <StaggerItem key={item.label}>
              <div className="p-4 rounded-xl bg-white/3 border border-white/8">
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-slate-200">{item.value}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function FlowsFy() {
  const prefersReducedMotion = useReducedMotion();
  const stack = {
    Backend: ["Node.js", "Express", "TypeScript", "Prisma ORM", "BullMQ", "Redis"],
    Frontend: ["Next.js 14", "Tailwind CSS", "shadcn/ui"],
    "Base de datos": ["PostgreSQL"],
    Integraciones: ["Meta WhatsApp Cloud API", "Anthropic Claude API", "Wompi", "Resend"],
    Deploy: ["Railway", "Vercel"],
  };

  const features = [
    { icon: "🤖", title: "IA para atención al cliente 24/7", desc: "Bot de WhatsApp con Anthropic Claude que gestiona ventas, pedidos e inventario en lenguaje natural." },
    { icon: "🏪", title: "Multi-tenant desde cero", desc: "Arquitectura diseñada para escalar a múltiples clientes independientes en la misma plataforma." },
    { icon: "💳", title: "Pagos y suscripciones", desc: "Integración con Wompi (pasarela colombiana) para cobros y gestión de suscripciones." },
    { icon: "🧾", title: "Facturación electrónica DIAN", desc: "Integración con proveedor autorizado para emitir facturas electrónicas cumpliendo normativa colombiana." },
    { icon: "⚡", title: "Colas asíncronas con BullMQ", desc: "Procesamiento de mensajes y tareas en background con Redis para alta concurrencia." },
    { icon: "📦", title: "Gestión de inventario y pedidos", desc: "Control completo de stock, pedidos y trazabilidad directamente desde WhatsApp." },
  ];

  return (
    <section id="flowsfy" className="py-24 px-6 bg-indigo-950/10">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <SectionLabel icon={<Briefcase size={14} />} label="Proyecto destacado" />
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <h2 className="text-3xl font-bold text-white">
              FlowsFy
              <span className="ml-3 text-base font-normal text-slate-500">2026</span>
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/25 text-amber-300">
              En desarrollo
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-10 text-[15px]">
            Plataforma SaaS con IA para tiendas físicas. Diseño y desarrollo completo desde cero como{" "}
            <span className="text-slate-200 font-medium">único desarrollador</span>: arquitectura, base de datos, backend, frontend y entornos de desarrollo y despliegue iterativo (2026).
          </p>
        </FadeUp>

        {/* Features */}
        <StaggerContainer className="grid sm:grid-cols-2 gap-4 mb-10">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <motion.div
                className="p-5 rounded-xl bg-white/3 border border-white/8 h-full"
                {...cardLiftIndigoProps(prefersReducedMotion)}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stack */}
        <FadeUp delay={0.2}>
          <div className="rounded-2xl bg-white/3 border border-white/8 p-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">
              Stack tecnológico
            </h3>
            <div className="space-y-4">
              {Object.entries(stack).map(([category, items]) => (
                <div key={category} className="flex flex-wrap items-start gap-2">
                  <span className="w-28 text-xs text-slate-500 pt-1 shrink-0">{category}</span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                      <PopIn key={item} delay={i * 0.05}>
                        <span className="px-2.5 py-1 rounded-lg text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 skill-badge inline-block">
                          {item}
                        </span>
                      </PopIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ViveStone() {
  const prefersReducedMotion = useReducedMotion();
  const stack: Record<string, string[]> = {
    Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    "Backend y datos": ["API Routes (REST)", "Base de datos", "Persistencia de leads / contenido"],
    Integraciones: ["APIs de terceros", "Correo y notificaciones", "Webhooks"],
    Producto: ["Catálogo filtrable", "Galería", "Formularios", "SEO"],
  };

  const features = [
    {
      icon: "📋",
      title: "Catálogo y filtros",
      desc: "Navegación por cuarzos y sinterizados premium con agrupación clara para que arquitectos y clientes encuentren la referencia adecuada.",
    },
    {
      icon: "🖼️",
      title: "Galería de proyectos",
      desc: "Showcase visual de instalaciones reales para generar confianza y mostrar el resultado del material en espacios.",
    },
    {
      icon: "📬",
      title: "Contacto y cotización",
      desc: "Formularios conectados a APIs en el servidor, persistencia en base de datos e integraciones (correo, notificaciones) para dar seguimiento a cotizaciones.",
    },
    {
      icon: "🚚",
      title: "Alcance nacional",
      desc: "Mensaje claro de cobertura en Medellín, Área Metropolitana y despachos a nivel Colombia.",
    },
    {
      icon: "🔌",
      title: "APIs e integraciones",
      desc: "Lógica en servidor con APIs REST, base de datos e integraciones con proveedores externos para correo, métricas u otros flujos del negocio.",
    },
    {
      icon: "✅",
      title: "Propuesta de valor",
      desc: "Bloques que comunican calidad certificada, variedad de referencias y acompañamiento en la elección del material.",
    },
    {
      icon: "💎",
      title: "Identidad premium",
      desc: "Landing orientada a conversión con tono profesional acorde a superficies de alta gama.",
    },
  ];

  return (
    <section id="vivestone" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <SectionLabel icon={<Gem size={14} />} label="Sitio comercial" />
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <h2 className="text-3xl font-bold text-white">
              ViveStone
              <span className="ml-3 text-base font-normal text-slate-500">2025</span>
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400">
              En producción
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6 text-[15px]">
            Sitio corporativo para{" "}
            <a
              href="https://www.vivestonesas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 font-medium hover:text-violet-300 underline decoration-violet-500/40 underline-offset-2"
            >
              vivestonesas.com
            </a>
            : distribuidores de cuarzos y sinterizados premium en Itagüí y cobertura en Medellín, el Área Metropolitana y Colombia.
            Desarrollo full-stack con Next.js: interfaz, capa de APIs, base de datos, integraciones con servicios externos y despliegue en producción.
          </p>
        </FadeUp>

        <StaggerContainer className="grid sm:grid-cols-2 gap-4 mb-10">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <motion.div
                className="p-5 rounded-xl bg-white/3 border border-white/8 h-full"
                {...cardLiftIndigoProps(prefersReducedMotion)}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.15}>
          <div className="mb-10">
            <motion.a
              href="https://www.vivestonesas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
              {...linkTapProps(prefersReducedMotion)}
            >
              <ExternalLink size={16} />
              Visitar sitio
            </motion.a>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="rounded-2xl bg-white/3 border border-white/8 p-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">
              Stack tecnológico
            </h3>
            <div className="space-y-4">
              {Object.entries(stack).map(([category, items]) => (
                <div key={category} className="flex flex-wrap items-start gap-2">
                  <span className="w-28 text-xs text-slate-500 pt-1 shrink-0">{category}</span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item, i) => (
                      <PopIn key={item} delay={i * 0.05}>
                        <span className="px-2.5 py-1 rounded-lg text-xs bg-violet-500/10 border border-violet-500/20 text-violet-300 skill-badge inline-block">
                          {item}
                        </span>
                      </PopIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function AcademicProjects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="proyectos" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <SectionLabel icon={<GraduationCap size={14} />} label="Proyectos académicos" />
          <h2 className="text-3xl font-bold text-white mb-10">Proyectos destacados</h2>
        </FadeUp>

        <StaggerContainer className="space-y-4">
          {ACADEMIC_PROJECTS.map((project, index) => (
            <StaggerItem key={project.title}>
              <motion.div
                className="p-6 rounded-xl bg-white/3 border border-white/8 group"
                {...cardLiftAcademicProps(prefersReducedMotion)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-slate-600 group-hover:text-indigo-400 transition-colors duration-300">
                    0{index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-100">{project.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed ml-7 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 ml-7">
                  {project.tags.map((tag, i) => (
                    <PopIn key={tag} delay={i * 0.04}>
                      <motion.span
                        className="px-2 py-0.5 rounded-md text-xs bg-white/5 border border-white/10 text-slate-400 group-hover:border-indigo-500/20 group-hover:text-slate-300 transition-colors duration-300 inline-block cursor-default"
                        {...tagPopProps(prefersReducedMotion)}
                      >
                        {tag}
                      </motion.span>
                    </PopIn>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.1}>
          <motion.div
            className="mt-8 p-6 rounded-xl bg-white/3 border border-white/8 group"
            {...cardLiftEmeraldProps(prefersReducedMotion)}
          >
            <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <span>🧪</span> Calidad y pruebas de software
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Pruebas caja negra / blanca", "Selenium", "Cypress", "TestRail", "Jira", "Azure DevOps", "Scrum", "Planes de prueba"].map(
                (tag, i) => (
                  <PopIn key={tag} delay={i * 0.05}>
                    <motion.span
                      className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 inline-block cursor-default"
                      {...tagPopProps(prefersReducedMotion)}
                    >
                      {tag}
                    </motion.span>
                  </PopIn>
                )
              )}
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

function Skills() {
  const colors: Record<string, string> = {
    Backend: "bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20",
    Frontend: "bg-violet-500/10 border-violet-500/20 text-violet-300 hover:bg-violet-500/20",
    Móvil: "bg-pink-500/10 border-pink-500/20 text-pink-300 hover:bg-pink-500/20",
    "Bases de Datos": "bg-amber-500/10 border-amber-500/20 text-amber-300 hover:bg-amber-500/20",
    "APIs e Integraciones": "bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20",
    "Infraestructura y Deploy": "bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20",
    Herramientas: "bg-slate-500/10 border-slate-500/20 text-slate-300 hover:bg-slate-500/20",
  };

  return (
    <section id="habilidades" className="py-24 px-6 bg-indigo-950/10">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <SectionLabel icon={<Code2 size={14} />} label="Habilidades técnicas" />
          <h2 className="text-3xl font-bold text-white mb-10">Stack & tecnologías</h2>
        </FadeUp>

        <StaggerContainer className="space-y-6">
          {SKILLS.map((group) => (
            <StaggerItem key={group.category}>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-slate-500">{group.icon}</span>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, i) => (
                    <PopIn key={skill} delay={i * 0.04}>
                      <span className={`px-3 py-1.5 rounded-lg text-xs border font-medium skill-badge transition-all duration-200 inline-block ${colors[group.category] ?? "bg-slate-500/10 border-slate-500/20 text-slate-300"}`}>
                        {skill}
                      </span>
                    </PopIn>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-950/40 to-violet-950/20 border border-indigo-500/20">
            <h3 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
              <Zap size={14} /> Inteligencia Artificial y Automatización
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Desarrollo de plataformas SaaS con IA generativa integrada como núcleo del producto (Anthropic Claude API). Redacción y optimización de prompts técnicos. Uso responsable de IA como herramienta de productividad y aprendizaje continuo.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-4 p-5 rounded-xl bg-white/3 border border-white/8">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Formación complementaria
            </h3>
            <div className="space-y-2">
              {[
                "Certificación en Administración de Redes de Datos – Cisco (En curso)",
                "Certificación en Metodologías Ágiles – Scrum (En curso)",
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contacto" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <SectionLabel icon={<Mail size={14} />} label="Contacto" centered />
          <h2 className="text-3xl font-bold text-white mb-4">¿Hablamos?</h2>
          <p className="text-slate-400 mb-12 max-w-md mx-auto text-[15px]">
            Estoy disponible para oportunidades laborales, proyectos freelance o colaboraciones. No dudes en escribirme.
          </p>
        </FadeUp>

        <StaggerContainer className="grid sm:grid-cols-2 gap-4 mb-10 max-w-md mx-auto w-full">
          {[
            {
              href: "mailto:emmanuelville@hotmail.com",
              icon: <Mail size={20} />,
              color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
              label: "Email",
              value: "emmanuelville@hotmail.com",
            },
            {
              href: undefined,
              icon: <MapPin size={20} />,
              color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
              label: "Ubicación",
              value: "Medellín, Colombia",
            },
          ].map((item) => (
            <StaggerItem key={item.label}>
              <motion.div {...contactCardLiftProps(prefersReducedMotion)}>
                {item.href ? (
                  <a href={item.href} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/3 border border-white/8 card-hover block">
                    <div className={`p-3 rounded-xl border ${item.color}`}>{item.icon}</div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                      <p className="text-xs text-slate-300 font-medium">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/3 border border-white/8">
                    <div className={`p-3 rounded-xl border ${item.color}`}>{item.icon}</div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                      <p className="text-xs text-slate-300 font-medium">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="flex items-center justify-center gap-4">
            <motion.a
              href="https://www.linkedin.com/in/villegas-emmanuel31/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
              {...linkTapProps(prefersReducedMotion)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </motion.a>
            <motion.a
              href="mailto:emmanuelville@hotmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 text-sm font-medium transition-colors duration-200"
              {...linkTapProps(prefersReducedMotion)}
            >
              <Mail size={15} />
              Enviar email
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.footer
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, ease: easeOutRefined }}
      className="border-t border-white/5 py-8 px-6 text-center"
    >
      <p className="text-xs text-slate-600">© 2026 Emmanuel Villegas Urrea · Medellín, Colombia</p>
    </motion.footer>
  );
}

function SectionLabel({
  icon,
  label,
  centered = false,
}: {
  icon: React.ReactNode;
  label: string;
  centered?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${centered ? "justify-center" : ""}`}>
      <span className="text-indigo-400">{icon}</span>
      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <AnimatedDivider />
      <AboutMe />
      <AnimatedDivider />
      <FlowsFy />
      <AnimatedDivider />
      <ViveStone />
      <AnimatedDivider />
      <AcademicProjects />
      <AnimatedDivider />
      <Skills />
      <AnimatedDivider />
      <Contact />
      <Footer />
    </main>
  );
}
