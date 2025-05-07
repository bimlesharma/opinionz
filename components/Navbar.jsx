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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";

export default function Nav() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed w-full z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {/* <NavItems items={navItems} /> */}
          {/* hihihihih */}
          <form className="w-full relative lg:w-1/2 flex md:flex-row flex-col gap-4 items-center justify-center ">
          <input
            type="text"
            placeholder="Sign up to get started"
            className="w-full px-4 py-2 border text-xl border-neutral-700 rounded-full focus:outline focus:ring-neutral-300"
          />
          <button className="w-auto h-auto cursor-pointer absolute right-1">
            <DotLottieReact
              src="https://lottie.host/063ed933-b407-41aa-a21d-f84f272a70c4/n7hRn0IduF.lottie"
              loop
              autoplay
              className="bg-white rounded-full w-10 h-10 bg-cover  cursor-pointer"
            />
          </button>
        </form>

          <div className="flex items-center gap-4">
            {/* <NavbarButton variant="secondary" href="/login">Login</NavbarButton> */}
            <NavbarButton variant="primary" href="#">Get Started</NavbarButton>
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
            {/* hihihi */}
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