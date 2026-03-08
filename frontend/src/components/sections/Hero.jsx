import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'
import { SiReact, SiJavascript, SiPython, SiDocker } from 'react-icons/si'
import resumeFile from '../../assets/Piyush_Singh_Resume.pdf'

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Piyushsinghpatel07', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/piyush-singh-patel-a7b883272', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:patelpiyush8383@gmail.com', label: 'Email' },
]

const floatingIcons = [
    { icon: SiReact, color: '#61DAFB', top: '72%', left: '84%', delay: 0, cls: 'float-anim' },
    { icon: SiJavascript, color: '#F7DF1E', top: '15%', left: '56%', delay: 1, cls: 'float-anim-2' },
    { icon: SiPython, color: '#3776AB', top: '25%', left: '82%', delay: 0.5, cls: 'float-anim-3' },
    { icon: SiDocker, color: '#2496ED', top: '55%', left: '58%', delay: 1.5, cls: 'float-anim-4' },
]

export default function Hero() {
    const [copied, setCopied] = useState(false)

    const handleEmailClick = (e, href, label) => {
        if (label === 'Email') {
            e.preventDefault()
            const email = href.replace('mailto:', '')
            navigator.clipboard.writeText(email)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            // Still try to open mailto in background for systems where it works
            window.location.href = href
        }
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden">
            {/* Decorative glow blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-700/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col gap-6"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-purple-400 font-medium tracking-widest uppercase text-sm"
                    >
                        Welcome to my portfolio
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
                    >
                        Hi, I'm{' '}
                        <span className="text-gradient">Piyush Singh Patel</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="text-2xl md:text-3xl font-bold text-gradient"
                    >
                        Full Stack Developer
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-400 text-lg leading-relaxed max-w-lg"
                    >
                        Full Stack Developer skilled in building scalable web applications using React, FastAPI, Python,
                        Tailwind CSS, and Docker, with a strong focus on integrating Generative AI into real-world applications.
                    </motion.p>

                    {/* Buttons Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.75 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <a
                            href={resumeFile}
                            download="Piyush_Singh_Resume.pdf"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-purple-900/40 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                        >
                            <FaDownload className="w-4 h-4" />
                            Download Resume
                        </a>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <div key={label} className="relative">
                                    <motion.a
                                        href={href}
                                        onClick={(e) => handleEmailClick(e, href, label)}
                                        {...(label !== 'Email' ? { target: '_blank', rel: 'noreferrer' } : {})}
                                        aria-label={label}
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        className="w-11 h-11 rounded-full border border-purple-700/50 bg-purple-900/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 hover:bg-purple-800/40 transition-all duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>

                                    {/* Copied Tooltip - specific to Email */}
                                    {label === 'Email' && (
                                        <AnimatePresence>
                                            {copied && (
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
                    </motion.div>
                </motion.div>

                {/* Right – Profile Image with Glow Ring */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative flex items-center justify-center"
                >
                    {/* Outer glow ring */}
                    <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 p-[3px] pulse-glow">
                        <div className="w-full h-full rounded-full bg-[#080010]" />
                    </div>

                    {/* Profile image */}
                    <div className="relative w-72 h-72 md:w-88 md:h-88 rounded-full overflow-hidden border-4 border-purple-800/50 z-10">
                        <img
                            src="/profile.jpg"
                            alt="Piyush Singh Patel"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.parentElement.style.background = 'linear-gradient(135deg, #1e1b4b, #4c1d95)'
                                e.target.parentElement.innerHTML += '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:80px;">👨‍💻</div>'
                            }}
                        />
                    </div>

                    {/* Floating tech icons */}
                    {floatingIcons.map(({ icon: Icon, color, top, left, delay, cls }, i) => (
                        <motion.div
                            key={i}
                            className={`absolute z-20 w-14 h-14 rounded-full flex items-center justify-center border border-white/10 shadow-lg ${cls}`}
                            style={{
                                top,
                                left,
                                background: 'rgba(13,1,24,0.85)',
                                boxShadow: `0 0 20px ${color}40`,
                                animationDelay: `${delay}s`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + delay * 0.3 }}
                        >
                            <Icon style={{ color, width: 28, height: 28 }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent"
                />
            </motion.div>
        </section>
    )
}
