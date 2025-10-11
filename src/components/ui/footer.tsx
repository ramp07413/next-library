import Link from 'next/link';
import React from 'react';
import { FaBookOpen, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
      {/* Modern 2025-style geometric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMyAwLTYgMi42ODYtNiA2czMgNiA2IDZ6bTAgNmMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMyAwLTYgMi42ODYtNiA2czMgNiA2IDZ6bTAgNmMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMyAwLTYgMi42ODYtNiA2czMgNiA2IDZ6IiBmaWxsPSIjMTUxNTE1Ii8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>

      {/* Advanced lighting effects */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] opacity-30"></div>
        <div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Top edge wave decoration */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-[98%] overflow-hidden w-full z-10 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto transform scale-y-[-1]"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-zinc-950"
            d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main content with premium effects */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
          {/* Brand and newsletter section - 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            {/* Logo with 3D glass effect */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary to-primary/40 opacity-30 blur-xl group-hover:opacity-70 transition duration-500"></div>
                <div className="relative bg-[#15151a] p-3.5 rounded-xl border border-primary/30 shadow-xl backdrop-blur-sm">
                  <FaBookOpen className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-400">
                  LibMan
                </h3>
                <p className="text-xs text-zinc-500 tracking-wider uppercase mt-0.5">
                  Library Management System
                </p>
              </div>
            </div>

            {/* Description with custom max-width */}
            <p className="text-zinc-400 text-base leading-relaxed max-w-md">
              The ultimate SaaS platform for modern library management.
              Streamline your operations and provide a better experience for
              everyone in a 2025 digital environment.
            </p>

            {/* Newsletter with premium floating effect */}
            <div className="relative group transition-all duration-300 max-w-md">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-500/50 rounded-xl blur opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
              <div className="relative bg-black/60 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Subscribe to updates..."
                    className="w-full bg-transparent px-5 py-4 text-white focus:outline-none placeholder:text-zinc-500"
                  />
                  <button className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center px-6 py-4 transition-all duration-300 font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Links and resources section - 7 columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-x-12 lg:gap-y-0">
            {/* Quick Links with hover effect */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"></span>
              </h4>
              <ul className="space-y-3.5">
                {[
                  { name: 'About Us', href: '/about' },
                  { name: 'Membership', href: '/membership' },
                  { name: 'Events', href: '/events' },
                  { name: 'Careers', href: '/careers' },
                  { name: 'Gallery', href: '/gallery' },
                  { name: 'Contact', href: '/contact' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="group w-fit flex items-center text-zinc-400 hover:text-white transition-all duration-300"
                    >
                      <span className="inline-block w-0 group-hover:w-2 h-px bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources section */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Resources
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"></span>
              </h4>
              <ul className="space-y-3.5">
                {[
                  { name: 'Help / FAQ', href: '/faq' },
                  { name: 'Rules & Regulations', href: '/rules' },
                  { name: 'Terms & Conditions', href: '/terms' },
                  { name: 'Privacy Policy', href: '/privacy' },
                  { name: 'Feedback', href: '/feedback' },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="group w-fit flex items-center text-zinc-400 hover:text-white transition-all duration-300"
                    >
                      <span className="inline-block w-0 group-hover:w-2 h-px bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect with premium animations */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full"></span>
              </h4>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <FaTwitter size={18} />, label: 'Twitter' },
                  { icon: <FaFacebook size={18} />, label: 'Facebook' },
                  { icon: <FaInstagram size={18} />, label: 'Instagram' },
                ].map((social, i) => (
                  <Link
                    href="#"
                    key={i}
                    aria-label={social.label}
                    className="group"
                  >
                    <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black border border-zinc-700 rounded-lg group-hover:border-primary/60 transition-all duration-500"></div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 rounded-lg"></div>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg"></div>
                      <div className="relative text-zinc-400 group-hover:text-primary transition-all duration-300 transform group-hover:scale-110">
                        {social.icon}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent line */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>
      </div>

      {/* Copyright section with ultra-modern styling */}
      <div className="relative mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <span>© {new Date().getFullYear()} LibMan</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
              <span>All rights reserved</span>
            </div>

            <div className="flex flex-wrap items-center gap-8 text-sm">
              <Link
                href="/terms"
                className="text-zinc-500 hover:text-primary transition-all duration-300"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-zinc-500 hover:text-primary transition-all duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-zinc-500 hover:text-primary transition-all duration-300"
              >
                Cookies
              </Link>
              <Link
                href="/sitemap"
                className="text-zinc-500 hover:text-primary transition-all duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
