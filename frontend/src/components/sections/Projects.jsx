import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaPlay } from 'react-icons/fa'

const allProjects = [
    {
        category: 'web',
        title: 'StrategyHub – AI Business Insights Platform',
        desc: 'StrategyHub is an AI-powered SaaS platform that generates business insights, market research, and strategic recommendations using Generative AI. The platform allows users to input business data and receive automated analysis reports and strategy suggestions.',
        tech: ['React', 'FastAPI', 'Python', 'Docker', 'Generative AI'],
        demo: 'https://strategyhub.in/',
        image: '/project1.png',
    },
    {
        category: 'web',
        title: 'Plannest – AI Business Strategy Generator',
        desc: 'Plannest is an AI-driven platform designed to generate complete business strategies based on user inputs. It leverages Generative AI models to create industry analysis, financial forecasts, and actionable strategic plans.',
        tech: ['React', 'Tailwind', 'FastAPI', 'Python', 'Docker', 'Generative AI'],
        demo: 'https://plannest.org/',
        image: '/project2.png',
    },
    {
        category: 'ai',
        title: 'AI Chatbot Assistant',
        desc: 'An AI-powered chatbot capable of answering questions, generating insights, and assisting users with intelligent conversations. Built using modern LLM APIs and integrated into a full stack application.',
        tech: ['React', 'FastAPI', 'Python', 'MongoDB', 'Generative AI APIs'],
        repo: 'https://github.com/piyush',
        demo: '#',
        image: '/project3.png',
    },
]

const tabs = [
    { label: 'Web Application', value: 'web' },
    { label: 'AI Applications', value: 'ai' },
]

// placeholder color per project
const projectColors = ['#7c3aed', '#ec4899', '#0ea5e9']

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden group hover:border-purple-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20"
        >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.style.background = `linear-gradient(135deg, ${projectColors[index % 3]}30, #0d0118)`
                        e.target.parentElement.innerHTML += `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px"><span style="font-size:48px">🚀</span><span style="color:#a855f7;font-size:12px;font-weight:600">Project Preview</span></div>`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080010] via-transparent to-transparent" />
            </div>

            {/* Card content */}
            <div className="p-6 flex flex-col gap-4">
                <h3 className="text-white font-bold text-base leading-snug group-hover:text-purple-300 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-full border border-purple-700/40 bg-purple-900/20 text-purple-300 font-medium"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-1">
                    {project.repo && (
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600/50 text-purple-300 text-sm font-medium hover:bg-purple-900/30 transition-all duration-200 hover:border-purple-400"
                        >
                            <FaGithub className="w-4 h-4" />
                            Repository
                        </a>
                    )}
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:opacity-90 hover:scale-105 transition-all duration-200"
                    >
                        <FaPlay className="w-3 h-3" />
                        Demo
                    </a>
                </div>
            </div>
        </motion.div>
    )
}

export default function Projects() {
    const [activeTab, setActiveTab] = useState('web')

    const filtered = allProjects.filter(
        (p) => p.category === activeTab || activeTab === 'all'
    )
    // show all if none in filtered
    const displayed = filtered.length > 0 ? filtered : allProjects

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-800/8 rounded-full blur-[130px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold text-center mb-10"
                >
                    My Projects
                </motion.h2>

                {/* Tab toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="flex justify-center gap-2 mb-14"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab.value
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-800/30'
                                : 'border border-purple-700/40 text-gray-400 hover:text-white hover:border-purple-500 bg-transparent'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Projects grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {displayed.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
