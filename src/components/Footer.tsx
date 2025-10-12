import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#3E2C20] text-[#f3e9dc] py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                <div>
                    <Link href="/">
                        <h2 className="text-5xl font-logo text-yellow-500 select-none">Nuroxa</h2>
                    </Link>
                    <p className="mt-2 text-sm text-[#e1d4c4]">
                        Nuroxa is your go-to destination for premium watches delivered with ease, style, and trust.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-yellow-400">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        <li><Link href="/products">Products</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2 text-yellow-400">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-yellow-500 transition">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-yellow-500 transition">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-yellow-500 transition">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-xs text-[#d3c7b8] border-t border-[#ffffff1a] pt-4">
                &copy; {new Date().getFullYear()} Nuroxa. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
