import { Navbar } from "@/components/landing-page/Navbar";
import { Hero } from "@/components/landing-page/Hero";
import { TrustedBy } from "@/components/landing-page/TrustedBy";
import { Features } from "@/components/landing-page/Features";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { WhyChooseUs } from "@/components/landing-page/WhyChooseUs";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { FAQ } from "@/components/landing-page/FAQ";
import { FinalCTA } from "@/components/landing-page/FinalCTA";
import { Footer } from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-base-bg overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}