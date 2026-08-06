import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export default function Home() {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdul Rafi",
    url: SITE_URL,
    email: `mailto:${CONTACT_EMAIL}`,
    jobTitle: "Pengembang website dan sistem informasi",
    description: SITE_DESCRIPTION,
    sameAs: ["https://github.com/arraf-dev"],
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Pricing />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
