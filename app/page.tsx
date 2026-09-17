import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ClosingSection } from "@/components/sections/ClosingSection";
import { CompaniesSection } from "@/components/sections/CompaniesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { NetworkingSection } from "@/components/sections/NetworkingSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { PositioningSection } from "@/components/sections/PositioningSection";
import { TalentSection } from "@/components/sections/TalentSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TournamentsSection } from "@/components/sections/TournamentsSection";
import { getMessages } from "@/lib/messages";

export default function HomePage() {
  const messages = getMessages();

  return (
    <>
      <a className="skip-link" href="#main-content">
        {messages.navigation.skipLink}
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <PositioningSection />
        <HowItWorksSection />
        <TalentSection />
        <CompaniesSection />
        <TournamentsSection />
        <NetworkingSection />
        <TestimonialsSection />
        <NewsSection />
        <NewsletterSection />
        <ClosingSection />
      </main>
      <SiteFooter />
    </>
  );
}
