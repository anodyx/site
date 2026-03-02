import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const projects = [
  {
    title: "HackOverflow 2K25",
    subtitle: "Hackathon Management Portal",
    challenge: "SRKR Coding Club needed a comprehensive platform to manage their flagship hackathon event with registration, team management, and real-time updates.",
    solution: "Built a vibrant, user-friendly event management platform with participant registration, team formation, live leaderboards, and admin dashboard in 4 weeks.",
    results: ["2000+ event registrations", "Zero downtime during 48-hour hackathon", "Seamless experience for 500+ teams"],
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
  },
  {
    title: "IconCoderz Portal",
    subtitle: "Coding Competition Platform",
    challenge: "SRKR Coding Club required a dedicated platform for their coding competition series with automated evaluation and scoring systems.",
    solution: "Developed an interactive coding portal with problem sets, real-time code submission, automated testing, and dynamic ranking system.",
    results: ["1500+ active participants", "99.9% uptime during competitions", "Automated evaluation of 5000+ submissions"],
    tech: ["React", "Express", "PostgreSQL", "Docker"],
  },
  {
    title: "Raja Cycle Stores",
    subtitle: "E-commerce & Inventory Platform",
    challenge: "A traditional bicycle retail business needed digital transformation with online presence and inventory management on a tight timeline.",
    solution: "Created a modern e-commerce platform with product catalog, online ordering, inventory tracking, and customer management system despite challenging last-minute requirement changes.",
    results: ["Digital presence established", "Online ordering system live", "Streamlined inventory management"],
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "CodeQuest",
    subtitle: "Interactive Learning Platform",
    challenge: "Building an engaging platform for students to learn programming through interactive challenges and gamified experiences.",
    solution: "Developed a comprehensive learning platform with coding challenges, progress tracking, achievement system, and community features.",
    results: ["Engaging learning experience", "Interactive code editor", "Gamified progress system"],
    tech: ["React", "Firebase", "Monaco Editor", "Tailwind CSS"],
  },
  {
    title: "Car 1983",
    subtitle: "Automotive Showcase Platform",
    challenge: "Creating a visually stunning platform to showcase classic and vintage automobiles with rich media and detailed specifications.",
    solution: "Built an immersive web experience with high-quality image galleries, detailed car specifications, and smooth animations for optimal presentation.",
    results: ["Stunning visual presentation", "Responsive design across devices", "Optimized performance"],
    tech: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
  },
];

const WorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.25], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  return (
    <section id="work" ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Parallax header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4">
            Products We've Brought to Life
          </h2>
          <p className="text-muted-foreground text-lg">
            From healthcare platforms to logistics tools, see how we've transformed ideas into impact.
          </p>
        </motion.div>

        {/* Cards slide in from alternating directions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -60 : 60,
                y: 30,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-card rounded-xl overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Animated colored header bar */}
              <motion.div
                className="h-2 bg-hero"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
                style={{ transformOrigin: "left" }}
              />
              <div className="p-8">
                <h3 className="font-display text-xl font-700 text-foreground">{p.title}</h3>
                <p className="text-sm text-accent font-medium mb-4">{p.subtitle}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Challenge</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.challenge}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.solution}</p>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Results</p>
                  <ul className="space-y-1">
                    {p.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-accent">✓</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button variant="outline" size="lg" asChild>
            <a href="#cta">Start Your Project</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection;
