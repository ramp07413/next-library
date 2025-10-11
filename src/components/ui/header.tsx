import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBookOpen } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or on menu item
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/membership', label: 'Membership' },
    { href: '/events', label: 'Events' },
    { href: '/careers', label: 'Careers' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm'
            : 'bg-background border-b border-border'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <FaBookOpen className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h1 className="text-2xl font-bold font-headline bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              LibMan
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center flex-grow">
            <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 backdrop-blur-sm">
              {navigationLinks.map((link, index) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  asChild
                  className="relative rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link href={link.href} className="relative z-10">
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <Button
              variant="secondary"
              asChild
              className="transition-all duration-300 hover:scale-105"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Link href="/signup" className="font-semibold">
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden mobile-menu-container">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="relative p-2 transition-all duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <FaBookOpen className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold font-headline">Menu</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
              >
                <FaTimes className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4">
              <div className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center p-4 rounded-xl text-left w-full transition-all duration-300 hover:bg-primary/5 hover:text-primary hover:translate-x-2 ${
                      isMenuOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-8 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                    }}
                  >
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="p-6 space-y-3 border-t border-border/50">
              <Button
                variant="secondary"
                asChild
                className="w-full justify-center transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href="/login" onClick={closeMenu}>
                  Log In
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-center bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                <Link href="/signup" onClick={closeMenu}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
