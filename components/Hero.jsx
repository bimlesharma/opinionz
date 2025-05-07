"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  UserIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
  KeyIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="sticky top-0 w-full dark:bg-neutral-90 shadow-sm">
      <Nav />
      <Main />
    </div>
  );
}

export function Nav() {
  const navItems = [
    // {
    //   name: "Features",
    //   link: "#features",
    // },
    {
      name: "Why OpinionZ?",
      link: "#why",
    },
    // {
    //   name: "Contact",
    //   link: "#contact",
    // },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" href="/login">Login</NavbarButton>
            <NavbarButton variant="primary" href="/signup">Get Started</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get Started
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

const Main = () => {
  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="mb-4 h-[50vh] text-center text-neutral-300 flex flex-col gap-16 text-xl items-center justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold">
        Share Your Opinion Anonymously
        </h1>
        <p>
        Anonymous voices, AI insights — turning raw opinions into real impact.
        </p>
        <form className="w-full relative lg:w-1/2 flex md:flex-row flex-col gap-4 items-center justify-center ">
          <input
            type="email"
            placeholder="Sign up to get started"
            className="w-full px-4 py-4 border text-xl border-neutral-700 rounded-full focus:outline focus:ring-neutral-300"
          />
          <button className="w-auto h-auto cursor-pointer absolute right-2">
            <DotLottieReact
              src="https://lottie.host/063ed933-b407-41aa-a21d-f84f272a70c4/n7hRn0IduF.lottie"
              loop
              autoplay
              className="bg-white rounded-full w-12 h-12 bg-cover  cursor-pointer"
            />
          </button>
        </form>
      </div>
      <div id="why">
      <h2  className="text-center lg:pt-24 pb-16 text-3xl font-bold">
        Why OpinionZ?
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            title: "Post Anonymously, Share Freely",
            description:
              "Fresh alias each login. Speak freely, stay anonymous.",
            width: "md:col-span-2",
            icon: UserIcon,
          },
          {
            id: 2,
            title: "AI-Powered Fact Checks",
            description:
              "Real-time, private fact-checks powered by Gemini. Nothing stored.",
            width: "md:col-span-2",
            icon: CpuChipIcon,
          },
          {
            id: 3,
            title: "Expert User Badge",
            description:
              "1000+ upvotes & <25% downvotes? You’re auto-verified as an expert.",
            width: "md:col-span-2",
            icon: ShieldCheckIcon,
          },
          {
            id: 4,
            title: "Comment Freely, Stay Hidden",
            description:
              "Engage in discussion anonymously. Abuse-resistant, trackable system.",
            width: "md:col-span-2",
            icon: ChatBubbleLeftEllipsisIcon,
          },
          {
            id: 5,
            title: "Vote-Based Community Moderation",
            description:
              "No central admin. Votes drive content visibility and user status.",
            width: "md:col-span-2",
            icon: HandThumbUpIcon,
          },
          {
            id: 6,
            title: "Secure OTP Login & Sessions",
            description:
              "Email or phone-based OTP login with secure token authentication.",
            width: "md:col-span-2",
            icon: KeyIcon,
          },
          {
            id: 7,
            title: "Fully Public Platform",
            description:
              "No closed rooms. All posts, comments, and votes are publicly visible.",
            width: "md:col-span-4",
            icon: GlobeAltIcon,
          },
        ].map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.id}
              className={`
        ${feature.width} h-60 
        bg-neutral-100 dark:bg-neutral-800 
        flex items-center gap-4 
        rounded-lg p-6 shadow-sm 
        transition-all duration-300 ease-out
        hover:shadow-[0_0_20px_4px_rgba(99,102,241,0.3)]  // Tailwind-safe custom glow
        hover:ring-1 hover:ring-neutral-700 hover:scale-[1.0]
        dark:hover:shadow-[0_0_25px_6px_rgba(147,51,234,0.4)]
      `}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Icon className="w-12 h-12 text-blue-600 dark:text-purple-400 shrink-0 transition-transform duration-300 group-hover:rotate-3" />
              <div>
                <h3 className="text-lg font-semibold mb-1 text-neutral-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default Hero;
