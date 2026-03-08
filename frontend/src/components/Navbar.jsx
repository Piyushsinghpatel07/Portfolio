import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [active, setActive] = useState('Home')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleClick = (e, label, href) => {
        e.preventDefault()
        setActive(label)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#080010]/90 backdrop-blur-xl border-b border-purple-900/30 shadow-lg shadow-purple-900/10'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#home"
                    onClick={(e) => handleClick(e, 'Home', '#home')}
                    className="text-xl font-bold"
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="text-gradient">Piyush&lt;/&gt;</span>
                </motion.a>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.label, link.href)}
                            className={`text-sm font-medium transition-colors duration-200 relative group ${active === link.label
                                    ? 'text-purple-400'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                            <span
                                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${active === link.label ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}
                            />
                        </a>
                    ))}
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden text-gray-400 hover:text-white p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </motion.nav>
    )
}
