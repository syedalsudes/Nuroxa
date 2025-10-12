'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Shop', href: '/shop' },
        { name: 'Contact', href: '#contact' },
        { name: 'Why Us', href: '#whyus' },
    ];

    return (
        <header className="bg-[#3E2C20] text-[#F3E9DC] shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link href="/">
                    <div className="text-5xl font-logo leading-none text-accent-text select-none tracking-wide">
                        Nuroxa
                    </div>
                </Link>

                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="hover:text-button-gold transition-colors duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <button
                    className="md:hidden text-3xl text-[#F3E9DC]"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#5C4033] px-6 pb-4 pt-2 space-y-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block text-lg hover:text-button-gold transition-colors duration-200"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
