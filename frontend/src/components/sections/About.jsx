import { motion } from 'framer-motion'
import { FaLaptopCode, FaBrain, FaCode } from 'react-icons/fa'

const features = [
    {
        icon: FaLaptopCode,
        title: 'Web Application Development',
        desc: 'Design and develop scalable web applications using React, FastAPI, and modern frontend frameworks with responsive and user-friendly interfaces.',
    },
    {
        icon: FaBrain,
        title: 'Generative AI Integration',
        desc: 'Build intelligent applications by integrating Generative AI APIs to automate insights, generate business strategies, and create AI-powered workflows.',
    },
    {
        icon: FaCode,
        title: 'Problem Solving',
        desc: 'Strong analytical and debugging skills with the ability to design efficient backend systems and scalable software architectures.',
    },
]

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
}

export default function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                {/* Section heading */}
                <motion.h2
                    {...fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold text-center mb-20"
                >
                    About Me
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left – circular image with glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            {/* Glow ring */}
                            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-800 blur-sm opacity-60" />
                            <div
                                className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-700/60 relative z-10"
                                style={{ boxShadow: '0 0 60px rgba(139,92,246,0.5), 0 0 100px rgba(139,92,246,0.2)' }}
                            >
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
                        </div>
                    </motion.div>

                    {/* Right – content */}
                    <div className="flex flex-col gap-6">
                        <motion.h3
                            {...fadeInUp}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl md:text-3xl font-bold text-gradient"
                        >
                            I'm Piyush Singh Patel
                        </motion.h3>

                        <motion.div
                            {...fadeInUp}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-400 leading-relaxed space-y-4"
                        >
                            <p>
                                I am a Full Stack Developer currently working at Strategic Execution Consultants Pvt. Ltd.
                                I specialize in building scalable web applications and integrating Generative AI into
                                real-world platforms. I have experience developing AI-powered SaaS tools, business intelligence
                                platforms, and automation systems using modern technologies like React, FastAPI, Python,
                                Docker, and MongoDB.
                            </p>
                            <p>
                                I enjoy building innovative solutions that combine software engineering with artificial
                                intelligence to solve real business problems.
                            </p>
                        </motion.div>

                        {/* Feature boxes */}
                        <div className="flex flex-col gap-3 mt-2">
                            {features.map(({ icon: Icon, title, desc }, i) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                                    whileHover={{ x: 6, borderColor: 'rgba(168,85,247,0.6)' }}
                                    className="flex items-center gap-4 px-5 py-4 rounded-xl border border-purple-800/40 bg-purple-900/10 cursor-default transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-900/50 border border-purple-700/40 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                        <Icon className="text-purple-400 w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-purple-300 font-semibold text-sm">{title}</p>
                                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
