import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

interface Review {
  projectImage?: string;
  projectDescription: string;
  clientQuote: string;
  clientName: string;
  clientRole: string;
  clientAvatar?: string;
  company: string;
}

const reviews: Review[] = [
  {
    projectDescription:
      "As the Convener of SRKR Coding Club, I truly appreciate the amazing work done by the team in developing the websites for HackOverflow-2K25 and IconCoderz-2K26. \
They understood our vision perfectly and turned it into vibrant, user-friendly platforms that reflect the spirit of our coding events. Their dedication, creativity, and timely support made the entire process smooth and enjoyable. \
We are genuinely grateful for their effort and look forward to collaborating again in the future.",
    clientQuote: "Proud to ship this together.",
    clientName: "David Raju",
    clientRole: "Convener, SRKR Coding Club",
    company: "SRKR Coding Club",
    projectImage: "./srkrcc.webp"
  },
  {
    projectDescription:
      "Your approach to understanding business requirements and handling our last-minute requests can sometimes be quite frustrating, yet the level of professionalism you consistently demonstrate is truly commendable. Despite the challenges and the pressure that comes with sudden changes and tight deadlines, you always manage to stay composed, focused, and solution-oriented. Your ability to adapt quickly while maintaining a high standard of work does not go unnoticed. Kudos to you for your outstanding and unwavering professionalism!",
    clientQuote: "Pushing boundaries is what we do.",
    clientName: "Sai Krishna",
    clientRole: "Founder, Raja Cycle Stores",
    company: "Raja Cycle Stores",
    projectImage: "./rajacycles.webp"
  },
  {
    projectDescription:
      "Anodyx built our EdTech platform with video lessons, quizzes, progress tracking, and payment integration — all in 10 weeks.",
    clientQuote: "Loved building it with you.",
    clientName: "Priya Sharma",
    clientRole: "CEO, EduConnect",
    company: "Anodyx",
  },
];

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="flex-shrink-0 w-[540px] md:w-[480px] rounded-3xl bg-card border border-border/60 overflow-hidden group hover:shadow-lg duration-300 p-4">
    {/* Project image area */}
    <div className="h-56 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/15 relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 flex items-center justify-center">
        {review.projectImage ? (
          <img
            src={review.projectImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="grid grid-cols-2 gap-2 p-4 opacity-70 group-hover:opacity-90 transition-opacity duration-300">
            <div className="w-24 h-16 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/10" />
            <div className="w-24 h-16 rounded-lg bg-accent/10 backdrop-blur-sm border border-accent/10" />
            <div className="w-24 h-16 rounded-lg bg-secondary/15 backdrop-blur-sm border border-secondary/15" />
            <div className="w-24 h-16 rounded-lg bg-primary/8 backdrop-blur-sm border border-primary/8" />
          </div>
        )}
      </div>
      {/* Floating brand badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
        <img src="/Logo_2.png" alt="" className="h-4 w-auto" />
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <p className="text-sm text-foreground leading-relaxed mb-3">
        {review.projectDescription}
      </p>
      <p className="text-xs text-muted-foreground mb-4">{review.clientName}</p>

      {/* Divider */}
      <div className="border-t border-border/50 pt-4 mb-4">
        <p className="text-sm text-foreground/80 italic mb-1">
          "{review.clientQuote}"
        </p>
        <p className="text-xs text-muted-foreground">{review.company}</p>
      </div>

      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-bold">
          {review.clientName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {review.clientName}
          </p>
          <p className="text-xs text-muted-foreground">{review.clientRole}</p>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialSlider = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Duplicate reviews for seamless infinite loop
  const doubledReviews = [...reviews, ...reviews];

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-800 text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Real stories from real founders. See why teams trust us with their
            most important projects.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="relative mb-6 pointer-events-none">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          <div className="marquee-content gap-6">
            {doubledReviews.map((review, i) => (
              <ReviewCard key={`row1-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Stars */}
      {/* <motion.div
        className="flex items-center justify-center gap-2 mt-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-amber-400 text-amber-400"
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          4.9/5 from 50+ clients
        </span>
      </motion.div> */}
    </section>
  );
};

export default TestimonialSlider;
