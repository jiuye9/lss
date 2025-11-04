'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '/' },
    { name: '限量发行', href: '/limited-releases' },
    { name: '预约抢购', href: '/pre-order' },
    { name: 'VIP会员', href: '/membership' },
    { name: '收藏认证', href: '/certification' },
    { name: '发行动态', href: '/releases' },
    { name: '联系我们', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-official.png"
                alt="尊想世家 LUXE DREAM HOME - 全球限量定制发行网"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:text-accent-gold transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <button className="px-6 py-2.5 bg-gradient-to-r from-accent-limited to-accent-gold text-white font-bold rounded-full hover:shadow-lg hover:shadow-accent-limited/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>立即预约</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white/98 backdrop-blur-lg transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '80px' }}
      >
        <div className="container-custom py-8">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-medium hover:text-accent-gold transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-8 px-8 py-4 bg-gradient-to-r from-accent-limited to-accent-gold text-white font-bold rounded-full text-lg animate-fade-in-up flex items-center space-x-3 justify-center">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span>立即预约</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
