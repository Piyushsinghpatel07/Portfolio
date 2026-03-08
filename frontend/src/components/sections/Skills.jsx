import { motion } from 'framer-motion'
import {
    SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss,
    SiPython, SiFastapi, SiNodedotjs, SiExpress,
    SiMongodb, SiDocker, SiGit, SiGithub,
} from 'react-icons/si'
import { FaRobot, FaBrain, FaPlug } from 'react-icons/fa'
import { VscVscode } from 'react-icons/vsc'

const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'HTML', icon: SiHtml5, color: '#E34F26', level: 9 },
            { name: 'CSS', icon: SiCss, color: '#1572B6', level: 8 },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 8 },
            { name: 'React.js', icon: SiReact, color: '#61DAFB', level: 9 },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8', level: 8 },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Python', icon: SiPython, color: '#3776AB', level: 9 },
            { name: 'FastAPI', icon: SiFastapi, color: '#009688', level: 8 },
            { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 6 },
            { name: 'Express.js', icon: SiExpress, color: '#ffffff', level: 6 },
        ],
    },
    {
        title: 'Database',
        skills: [
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 7 },
        ],
    },
    {
        title: 'DevOps / Tools',
        skills: [
            { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 7 },
            { name: 'Git', icon: SiGit, color: '#F05032', level: 8 },
            { name: 'GitHub', icon: SiGithub, color: '#ffffff', level: 8 },
            { name: 'VS Code', icon: VscVscode, color: '#007ACC', level: 9 },
        ],
    },
    {
        title: 'AI / LLM',
        skills: [
            { name: 'Prompt Engineering', icon: FaRobot, color: '#a855f7', level: 8 },
            { name: 'Generative AI', icon: FaBrain, color: '#ec4899', level: 7 },
            { name: 'AI API Integration', icon: FaPlug, color: '#8b5cf6', level: 8 },
        ],
    },
]

const TOTAL_DOTS = 12

function SkillRow({ name, icon: Icon, color, level, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="flex items-center gap-4"
        >
            {/* Icon circle */}
            <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border"
                style={{
                    background: `${color}18`,
                    borderColor: `${color}40`,
                    boxShadow: `0 0 10px ${color}25`,
                }}
            >
                <Icon style={{ color, width: 22, height: 22 }} />
            </div>

            {/* Skill name */}
            <span className="text-gray-300 text-sm font-medium w-36 shrink-0">{name}</span>

            {/* Progress dots */}
            <div className="flex gap-2 flex-wrap">
                {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06 + i * 0.04 }}
                        className="w-3 h-3 rounded-full transition-all"
                        style={{
                            background: i < level ? color : `${color}20`,
                            boxShadow: i < level ? `0 0 6px ${color}80` : 'none',
                            opacity: i < level ? 1 - (i / TOTAL_DOTS) * 0.3 : 0.25,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/8 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold text-center mb-20"
                >
                    My Skills
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-x-20 gap-y-14">
                    {skillCategories.map((cat, ci) => (
                        <div key={cat.title} className="flex flex-col gap-6">
                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: ci * 0.1 }}
                                className="text-purple-400 font-semibold uppercase tracking-widest text-xs mb-2 border-b border-purple-900/40 pb-2"
                            >
                                {cat.title}
                            </motion.h3>
                            <div className="flex flex-col gap-5">
                                {cat.skills.map((skill, si) => (
                                    <SkillRow key={skill.name} {...skill} index={si} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
