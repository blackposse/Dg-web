import { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Input,
  Textarea,
  Select,
  SelectItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
  Link,
} from "@heroui/react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const trackItems = [
  { icon: "🛂", title: "Passport", desc: "Expiry dates tracked per employee with automated status alerts before renewal deadlines.", chip: "Identity", color: "primary" },
  { icon: "📋", title: "Work Permit Fee", desc: "WP fee expiry monitoring with early warnings to ensure timely renewals and legal compliance.", chip: "Legal", color: "secondary" },
  { icon: "🛡", title: "Insurance", desc: "Insurance coverage expiry tracked for each employee with critical and warning level alerts.", chip: "Coverage", color: "success" },
  { icon: "🏥", title: "Medical", desc: "Medical certificate validity monitored per employee with timely alerts for renewals.", chip: "Health", color: "warning" },
  { icon: "🏢", title: "Quota Slot", desc: "Quota slot expiry tracked with live site capacity indicators and utilisation warnings.", chip: "Site Quota", color: "danger" },
];

const features = [
  { icon: "⚡", title: "Live Dashboard", desc: "Real-time overview of all document statuses, alert counts, expiring records and invoice summaries.", bullets: ["Critical & expired doc counters", "Site quota utilisation", "Invoice summary stats", "Document health by type"] },
  { icon: "🔔", title: "Smart Alerts", desc: "Proactively tracks expiry windows. Filter by employee, status, employer or document category.", bullets: ["Configurable alert windows", "Filter by doc type & status", "Expired & missing detection"] },
  { icon: "👤", title: "Employee Management", desc: "Complete records with document dates, employer assignments, site allocations and photo support.", bullets: ["Full document history", "Site & quota assignment", "Photo support"] },
  { icon: "🏗", title: "Employer & Site Mgmt", desc: "Manage multiple employers and sites with live quota utilisation and capacity alerts.", bullets: ["Multi-employer support", "Per-site quota tracking", "Capacity alerts"] },
  { icon: "🧾", title: "Invoice Generation", desc: "Generate professional branded PDF invoices with per-employee breakdowns.", bullets: ["WPF, Insurance & Combined types", "Per-employee charge control", "Company logo & stamp on PDF"] },
  { icon: "🔐", title: "Role-Based Access", desc: "Admin and staff roles with full audit logging of every action taken.", bullets: ["Admin & staff roles", "Full audit trail", "Rate limiting & backup"] },
  { icon: "📊", title: "Reports", desc: "Export detailed employee and document reports filtered by employer, site or status.", bullets: ["Exportable reports", "Multi-filter support", "Invoice history"] },
  { icon: "🎨", title: "Custom Branding", desc: "Company logo, stamp and details on every generated PDF automatically.", bullets: ["Logo & stamp on invoices", "Custom company details", "Configurable settings"] },
];

const steps = [
  { num: "01", title: "Set Up Employers & Sites", desc: "Add your employers and work sites. Configure quota slots per site so DocGuard can track capacity in real time." },
  { num: "02", title: "Add Employees & Documents", desc: "Enter employee records with work permit, passport, insurance and medical expiry dates. Assign them to employers and sites." },
  { num: "03", title: "Monitor Alerts Automatically", desc: "DocGuard instantly highlights expiring and missing documents. The dashboard shows critical, warning and expired counts at a glance." },
  { num: "04", title: "Generate & Track Invoices", desc: "Create branded PDF invoices for work permit fees, insurance or combined charges. Track payment status and full history." },
];

const perks = [
  { icon: "🎯", title: "Free Demo", desc: "We'll walk you through the full system live" },
  { icon: "⚡", title: "Fast Setup", desc: "Get up and running in less than a day" },
  { icon: "🛠", title: "Full Support", desc: "We help you every step of the way" },
  { icon: "🔒", title: "Managed & Secure", desc: "We host and manage everything — you just log in" },
];

const navLinks = ["What We Track", "Features", "How It Works", "Pricing", "Contact"];
const navHrefs = ["#track", "#features", "#how", "#pricing", "#contact"];

const employeeRanges = [
  { key: "1-25", label: "1 – 25" },
  { key: "26-100", label: "26 – 100" },
  { key: "101-500", label: "101 – 500" },
  { key: "500+", label: "500+" },
];

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", employees: new Set([]), message: "" });
  const fadeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-white font-['DM_Sans',sans-serif] overflow-x-hidden">

      {/* ── Grid noise bg ── */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(0,180,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,255,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* ─────────────── NAVBAR ─────────────── */}
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="bg-[#07090d]/80 backdrop-blur-xl border-b border-white/[0.06] fixed"
        maxWidth="xl"
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle className="sm:hidden text-white" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          <NavbarBrand>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0072f5] to-[#00c8ff] flex items-center justify-center text-sm">🛡</div>
              <span className="font-['Syne',sans-serif] font-extrabold text-xl text-white">DocGuard</span>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {navLinks.map((label, i) => (
            <NavbarItem key={i}>
              <Link href={navHrefs[i]} className="text-[#6b7a8d] hover:text-white text-sm font-medium transition-colors">{label}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2">
          <NavbarItem>
            <Button
              as="a"
              href="https://wa.me/9607770535"
              target="_blank"
              variant="bordered"
              size="sm"
              className="border-white/10 text-white hidden sm:flex"
              startContent={<span>💬</span>}
            >
              WhatsApp
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as="a"
              href="#contact"
              size="sm"
              className="bg-gradient-to-r from-[#0072f5] to-[#00c8ff] text-white font-semibold shadow-lg shadow-blue-500/20"
            >
              Request Demo
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="bg-[#07090d]/95 pt-6 gap-3">
          {navLinks.map((label, i) => (
            <NavbarMenuItem key={i}>
              <Link href={navHrefs[i]} className="text-[#a0aec0] text-lg w-full" onPress={() => setIsMenuOpen(false)}>{label}</Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      {/* ─────────────── HERO ─────────────── */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center pt-32 pb-20 px-4">

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,114,245,0.12) 0%, transparent 70%)" }}
        />

        {/* Badge */}
        <Chip
          className="fade-in visible mb-6 bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] font-semibold tracking-widest uppercase text-xs px-4 py-1"
          startContent={<span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] animate-pulse inline-block mr-1" />}
          variant="bordered"
        >
          Trusted Expatriate Compliance Platform
        </Chip>

        <h1 className="fade-in visible font-['Syne',sans-serif] font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl mb-6" style={{ transitionDelay: ".1s" }}>
          Never miss a<br />
          <span className="bg-gradient-to-r from-[#00c8ff] to-[#0072f5] bg-clip-text text-transparent">
            document expiry
          </span>
          <br />again
        </h1>

        <p className="fade-in visible text-[#6b7a8d] text-lg md:text-xl max-w-lg mb-10 font-light" style={{ transitionDelay: ".2s" }}>
          DocGuard keeps your entire workforce compliant — tracking work permits, passports, insurance, medical records and quota slots across all your sites, automatically.
        </p>

        <div className="fade-in visible flex gap-3 flex-wrap justify-center mb-14" style={{ transitionDelay: ".3s" }}>
          <Button
            as="a" href="#contact"
            size="lg"
            className="bg-gradient-to-r from-[#0072f5] to-[#00c8ff] text-white font-semibold text-base px-8 shadow-xl shadow-blue-500/25"
          >
            Request a Free Demo
          </Button>
          <Button
            as="a" href="https://wa.me/9607770535" target="_blank"
            size="lg"
            className="bg-[#25d366] text-white font-semibold text-base px-8 shadow-xl shadow-green-500/20"
            startContent={<span>💬</span>}
          >
            Chat on WhatsApp
          </Button>
        </div>

        {/* Stats */}
        <div className="fade-in visible flex gap-10 flex-wrap justify-center mb-16" style={{ transitionDelay: ".4s" }}>
          {[["5", "Document Types"], ["360°", "Compliance View"], ["Live", "Real-time Alerts"], ["PDF", "Branded Invoices"]].map(([v, l], i) => (
            <div key={i} className="text-center">
              <div className="font-['Syne',sans-serif] font-extrabold text-3xl bg-gradient-to-r from-[#00c8ff] to-white bg-clip-text text-transparent">{v}</div>
              <div className="text-xs text-[#6b7a8d] mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* Dashboard screenshot */}
        <div className="fade-in relative w-full max-w-4xl" style={{ transitionDelay: ".5s" }}>
          <img
            src="https://docguard.solutions/dashboard.PNG"
            alt="DocGuard Dashboard"
            className="w-full rounded-2xl border border-white/[0.07] shadow-[0_40px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]"
          />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-16 blur-2xl rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(0,114,245,0.35), transparent 70%)" }}
          />
        </div>
      </section>

      {/* ─────────────── TRACK ─────────────── */}
      <section id="track" className="relative z-10 py-24 px-4 max-w-6xl mx-auto">
        <div className="fade-in mb-12">
          <p className="text-[#00c8ff] text-xs font-semibold tracking-[.15em] uppercase mb-2">Document Tracking</p>
          <h2 className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4">
            Every document type,<br />fully covered
          </h2>
          <p className="text-[#6b7a8d] text-lg max-w-xl">
            DocGuard monitors all critical expatriate document expiries in one place — so nothing slips through the cracks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {trackItems.map((item, i) => (
            <Card
              key={i}
              className="fade-in bg-[#0d1117] border border-white/[0.06] hover:border-[#00c8ff]/30 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <CardBody className="p-5 flex flex-col gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#00c8ff]/10 flex items-center justify-center text-2xl">{item.icon}</div>
                <h3 className="font-['Syne',sans-serif] font-bold text-base">{item.title}</h3>
                <p className="text-[#6b7a8d] text-sm leading-relaxed">{item.desc}</p>
                <Chip size="sm" color={item.color} variant="flat" className="mt-auto w-fit text-xs font-semibold">{item.chip}</Chip>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* ─────────────── FEATURES ─────────────── */}
      <section id="features" className="relative z-10 py-24 px-4"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,114,245,0.04), transparent)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="fade-in mb-12">
            <p className="text-[#00c8ff] text-xs font-semibold tracking-[.15em] uppercase mb-2">Features</p>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4">
              Everything you need<br />to stay compliant
            </h2>
            <p className="text-[#6b7a8d] text-lg max-w-xl">
              One platform to track documents, manage quota slots, generate invoices and keep your workforce compliant — across all sites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <Card
                key={i}
                className="fade-in bg-[#0d1117] border border-white/[0.06] hover:border-[#00c8ff]/25 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <CardHeader className="pb-1 pt-5 px-5 flex gap-2 items-center">
                  <span className="text-xl">{f.icon}</span>
                  <h3 className="font-['Syne',sans-serif] font-bold text-base">{f.title}</h3>
                </CardHeader>
                <CardBody className="px-5 pt-1 pb-5 flex flex-col gap-3">
                  <p className="text-[#6b7a8d] text-sm">{f.desc}</p>
                  <ul className="flex flex-col gap-1.5">
                    {f.bullets.map((b, j) => (
                      <li key={j} className="flex items-center gap-2 text-[#6b7a8d] text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00c8ff] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section id="how" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="fade-in text-center max-w-xl mx-auto mb-12">
            <p className="text-[#00c8ff] text-xs font-semibold tracking-[.15em] uppercase mb-2">How It Works</p>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4">
              Up and running<br />in minutes
            </h2>
            <p className="text-[#6b7a8d] text-lg">DocGuard is fully managed — no technical setup on your end.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <Card
                key={i}
                className="fade-in bg-[#0d1117] border border-white/[0.06] hover:border-[#00c8ff]/25 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <CardBody className="p-6">
                  <div className="font-['Syne',sans-serif] font-extrabold text-5xl leading-none mb-4 bg-gradient-to-br from-[#00c8ff]/40 to-[#0072f5]/10 bg-clip-text text-transparent">
                    {s.num}
                  </div>
                  <h3 className="font-['Syne',sans-serif] font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-[#6b7a8d] text-sm leading-relaxed">{s.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── PRICING ─────────────── */}
      <section id="pricing" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in mb-12">
            <p className="text-[#00c8ff] text-xs font-semibold tracking-[.15em] uppercase mb-2">Pricing</p>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-[#6b7a8d] text-lg">Tailored to your organisation's size and needs.</p>
          </div>

          <div className="max-w-md mx-auto fade-in" style={{ transitionDelay: ".15s" }}>
            <Card className="bg-[#0d1117] border border-[#00c8ff]/20 shadow-[0_0_60px_rgba(0,114,245,0.12)]">
              <CardBody className="p-8 flex flex-col items-center gap-5">
                <Chip variant="flat" className="bg-[#00c8ff]/10 text-[#00c8ff] border border-[#00c8ff]/20 font-semibold tracking-widest uppercase text-xs">
                  What's Included
                </Chip>
                <h3 className="font-['Syne',sans-serif] font-extrabold text-2xl">Custom Quote</h3>
                <p className="text-[#6b7a8d] text-sm">Contact us for pricing tailored to your organisation's size and needs.</p>
                <Divider className="bg-white/[0.06] w-full" />
                <ul className="w-full flex flex-col gap-3 text-left">
                  {["Full feature access", "Includes setup & onboarding", "Ongoing support", "Fully managed — no tech setup on your end", "Secure hosted environment", "Regular updates & improvements"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#c8d4e0]">
                      <span className="w-5 h-5 rounded-md bg-[#17c964]/15 text-[#17c964] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter className="px-8 pb-8 pt-0">
                <Button
                  as="a" href="#contact"
                  fullWidth
                  size="lg"
                  className="bg-gradient-to-r from-[#0072f5] to-[#00c8ff] text-white font-semibold shadow-lg shadow-blue-500/20"
                >
                  Get a Quote
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section id="contact" className="relative z-10 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in text-center max-w-xl mx-auto mb-14">
            <p className="text-[#00c8ff] text-xs font-semibold tracking-[.15em] uppercase mb-2">Get in Touch</p>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-4xl md:text-5xl leading-tight tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-[#6b7a8d] text-lg">
              Request a free demo or reach out on WhatsApp — we'll walk you through everything.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start fade-in" style={{ transitionDelay: ".15s" }}>

            {/* Left: perks */}
            <div className="flex flex-col gap-4">
              <h3 className="font-['Syne',sans-serif] font-bold text-xl mb-1">Why teams choose DocGuard</h3>
              <p className="text-[#6b7a8d] text-sm mb-2">Join organisations across the Maldives who trust DocGuard to keep their workforce compliant.</p>
              {perks.map((p, i) => (
                <Card key={i} className="bg-[#0d1117] border border-white/[0.06]">
                  <CardBody className="p-4 flex flex-row gap-3 items-start">
                    <div className="w-10 h-10 rounded-xl bg-[#00c8ff]/10 flex items-center justify-center text-lg shrink-0">{p.icon}</div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">{p.title}</p>
                      <p className="text-[#6b7a8d] text-xs">{p.desc}</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
              <Button
                as="a" href="https://wa.me/9607770535" target="_blank"
                size="lg"
                className="mt-2 bg-[#25d366] text-white font-semibold shadow-lg shadow-green-500/20"
                startContent={<span>💬</span>}
              >
                Chat on WhatsApp
              </Button>
            </div>

            {/* Right: form */}
            <Card className="bg-[#0d1117] border border-white/[0.06]">
              <CardBody className="p-7">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                    <span className="text-5xl">✅</span>
                    <p className="font-['Syne',sans-serif] font-bold text-xl">Thank you!</p>
                    <p className="text-[#6b7a8d]">We'll be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Your Name" placeholder="John Smith" isRequired
                        value={form.name} onValueChange={(v) => setForm({ ...form, name: v })}
                        classNames={{ inputWrapper: "bg-[#131a22] border-white/[0.08] hover:border-[#00c8ff]/40 data-[focus=true]:border-[#00c8ff]/50", label: "text-[#6b7a8d]" }}
                        variant="bordered" labelPlacement="outside"
                      />
                      <Input
                        label="Company Name" placeholder="Acme Corp"
                        value={form.company} onValueChange={(v) => setForm({ ...form, company: v })}
                        classNames={{ inputWrapper: "bg-[#131a22] border-white/[0.08] hover:border-[#00c8ff]/40 data-[focus=true]:border-[#00c8ff]/50", label: "text-[#6b7a8d]" }}
                        variant="bordered" labelPlacement="outside"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Email Address" placeholder="you@company.com" type="email" isRequired
                        value={form.email} onValueChange={(v) => setForm({ ...form, email: v })}
                        classNames={{ inputWrapper: "bg-[#131a22] border-white/[0.08] hover:border-[#00c8ff]/40 data-[focus=true]:border-[#00c8ff]/50", label: "text-[#6b7a8d]" }}
                        variant="bordered" labelPlacement="outside"
                      />
                      <Input
                        label="Phone / WhatsApp" placeholder="+960 xxxxxxx"
                        value={form.phone} onValueChange={(v) => setForm({ ...form, phone: v })}
                        classNames={{ inputWrapper: "bg-[#131a22] border-white/[0.08] hover:border-[#00c8ff]/40 data-[focus=true]:border-[#00c8ff]/50", label: "text-[#6b7a8d]" }}
                        variant="bordered" labelPlacement="outside"
                      />
                    </div>
                    <Select
                      label="Number of Employees"
                      placeholder="Select range..."
                      selectedKeys={form.employees}
                      onSelectionChange={(v) => setForm({ ...form, employees: v })}
                      classNames={{ trigger: "bg-[#131a22] border-white/[0.08] hover:border-[#00c8ff]/40 data-[open=true]:border-[#00c8ff]/50", label: "text-[#6b7a8d]" }}
                      variant="bordered" labelPlacement="outside"
                    >
                      {employeeRanges.map((r) => (
                        <SelectItem key={r.key}>{r.label}</SelectItem>
                      ))}
                    </Select>
                    <Textarea
                      label="Message (optional)" placeholder="Tell us about your needs..."
                      value={form.message} onValueChange={(v) => setForm({ ...form, message: v })}
                      minRows={3}
                      classNames={{ inputWrapper: "bg-[#131a22] border-white/[0.08] hover:border-[#00c8ff]/40 data-[focus=true]:border-[#00c8ff]/50", label: "text-[#6b7a8d]" }}
                      variant="bordered" labelPlacement="outside"
                    />
                    <Button
                      type="submit" size="lg" fullWidth
                      className="bg-gradient-to-r from-[#0072f5] to-[#00c8ff] text-white font-semibold shadow-lg shadow-blue-500/20 mt-1"
                    >
                      Request Demo
                    </Button>
                  </form>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0072f5] to-[#00c8ff] flex items-center justify-center text-sm">🛡</div>
            <span className="font-['Syne',sans-serif] font-extrabold text-lg text-white">DocGuard</span>
          </div>
          <div className="flex gap-6 flex-wrap">
            {navLinks.map((label, i) => (
              <Link key={i} href={navHrefs[i]} className="text-[#6b7a8d] hover:text-white text-sm transition-colors">{label}</Link>
            ))}
          </div>
          <p className="text-[#6b7a8d] text-xs">© 2026 DocGuard. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
