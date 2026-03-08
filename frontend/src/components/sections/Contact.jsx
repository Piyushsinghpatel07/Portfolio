import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from 'react-icons/fa'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Piyushsinghpatel07', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/piyush-singh-patel-a7b883272', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:patelpiyush8383@gmail.com', label: 'Email' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
    const [copiedEmail, setCopiedEmail] = useState(false)

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleEmailClick = (e, href, label) => {
        if (label === 'Email') {
            e.preventDefault()
            const email = href.replace('mailto:', '')
            navigator.clipboard.writeText(email)
            setCopiedEmail(true)
            setTimeout(() => setCopiedEmail(false), 2000)
            window.location.href = href
        }
    }

    const handleSubmit = async (e) => {
        // ... (existing handleSubmit logic)
        e.preventDefault()
        setStatus('sending')
        try {
            await axios.post(`${BACKEND_URL}/contact`, form)
            setStatus('success')
            setForm({ name: '', email: '', message: '' })
            setTimeout(() => setStatus(null), 4000)
        } catch (err) {
            console.error(err)
            setStatus('error')
            setTimeout(() => setStatus(null), 4000)
        }
    }

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* ... (ambient glows and header) */}
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-800/12 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-800/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold text-center mb-16"
                >
                    Contact Me
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="rounded-3xl border border-white/8 bg-white/2 backdrop-blur-sm p-8 md:p-10"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm font-medium" htmlFor="contact-name">Name</label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-[#0d0118]/80 border border-white/8 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm font-medium" htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-[#0d0118]/80 border border-white/8 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300 text-sm font-medium" htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                required
                                rows={6}
                                value={form.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-[#0d0118]/80 border border-white/8 text-white placeholder-gray-600 focus:outline-none focus:border-purple-600 focus:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        {/* Status messages */}
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-green-400 text-sm font-medium text-center"
                            >
                                ✅ Message sent successfully! I'll get back to you soon.
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm font-medium text-center"
                            >
                                ❌ Something went wrong. Please try again.
                            </motion.p>
                        )}

                        {/* Submit */}
                        <div className="flex justify-end">
                            <motion.button
                                type="submit"
                                disabled={status === 'sending'}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-900/40 hover:shadow-purple-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {/* Social links footer */}
                <div className="flex justify-center gap-4 mt-10">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                        <div key={label} className="relative">
                            <motion.a
                                href={href}
                                onClick={(e) => handleEmailClick(e, href, label)}
                                target={label !== 'Email' ? '_blank' : undefined}
                                rel="noreferrer"
                                aria-label={label}
                                whileHover={{ scale: 1.15, y: -3 }}
                                className="w-11 h-11 rounded-full border border-purple-700/40 bg-purple-900/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-800/30 transition-all duration-300"
                            >
                                <Icon className="w-5 h-5" />
                            </motion.a>

                            {/* Tooltip specifc to Email in footer */}
                            {label === 'Email' && (
                                <AnimatePresence>
                                    {copiedEmail && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: -45, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg shadow-lg whitespace-nowrap"
                                            style={{ zIndex: 100 }}
                                        >
                                            Email Copied!
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-purple-600" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-600 text-xs mt-8">
                    © 2026 Piyush Singh Patel. All rights reserved.
                </p>
            </div>
        </section>
    )
}
