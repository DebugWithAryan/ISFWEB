"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./index.css";
import Image from "next/image";
import { Anton, Rubik } from "next/font/google";
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

// Initialize Anton font
const antonFont = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const rubikFont = Rubik({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Register ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

// SVG paths for the text animation
const wordPaths = {
  IETE: [
    "M2.50488 0.519085V9.14897H0.212891V0.519085H2.50488Z", // I
    "M8.52756 0.519085V2.42826H6.50119V3.75248H8.44553V5.61869H6.50119V7.22612H8.66232V9.14897H4.10373V0.519085H8.52756Z", // E
    "M14.5973 0.519085V2.41948H13.3727V9.14897H11.0114V2.41948H9.78677V0.519085H14.5973Z", // T
    "M20.3739 0.519085V2.42826H18.3475V3.75248H20.2919V5.61869H18.3475V7.22612H20.5087V9.14897H15.9501V0.519085H20.3739Z", // E
  ],
  STUDENTS: [
        "M28.187 0.443359C29.1465 0.443365 29.8666 0.649285 30.3032 1.09961L30.4555 1.27637C30.7869 1.71355 30.9428 2.31462 30.9428 3.05957V3.20996H28.5464V2.4873C28.5464 2.41504 28.5231 2.37248 28.4819 2.34082L28.479 2.33887C28.4358 2.30399 28.3661 2.27735 28.2514 2.27734C28.107 2.27734 28.0314 2.31109 27.9927 2.34863L27.9917 2.34766C27.9505 2.38825 27.9273 2.44307 27.9272 2.52441C27.9272 2.60733 27.9548 2.70791 28.0239 2.82812C28.0712 2.91028 28.1592 3.01091 28.2954 3.12891L28.4477 3.25293L28.4487 3.25391L29.6372 4.17578L29.8159 4.31836C29.991 4.46284 30.155 4.61391 30.3081 4.77148C30.5203 4.98673 30.6908 5.23857 30.8188 5.52539L30.8647 5.6377C30.9653 5.9064 31.0132 6.21874 31.0132 6.57129C31.0132 7.37546 30.8293 8.02692 30.4419 8.50684C30.0451 8.99999 29.3683 9.22458 28.4624 9.22461C27.5075 9.22461 26.7825 9.03381 26.3237 8.61816H26.3227C25.8655 8.19992 25.6528 7.54783 25.6528 6.69922V5.73535H27.9917V6.92676C27.9917 7.10164 28.0241 7.2203 28.0727 7.29785C28.1097 7.34916 28.1798 7.3916 28.3276 7.3916C28.4989 7.39159 28.5697 7.3499 28.5971 7.31543L28.5991 7.3125C28.6389 7.26509 28.6753 7.16416 28.6753 6.97363C28.6753 6.72932 28.6457 6.53524 28.5913 6.38672L28.5903 6.38574C28.5367 6.23692 28.4415 6.09104 28.2983 5.94922L28.2954 5.94629C28.1505 5.79625 27.9443 5.61879 27.6743 5.41309V5.41211L26.7485 4.70215V4.70312C26.0317 4.15659 25.6528 3.51328 25.6528 2.77539C25.6528 2.03645 25.8657 1.45034 26.311 1.04199V1.04102C26.7579 0.635203 27.3914 0.443359 28.187 0.443359Z", // S
        "M36.9546 0.519085V2.41948H35.73V9.14897H33.3687V2.41948H32.1441V0.519085H36.9546Z", // T
        "M40.4881 0.519085V6.70366C40.4881 6.83536 40.4972 6.96209 40.5155 7.08354L40.5311 7.1558C40.5501 7.22394 40.5792 7.27787 40.6161 7.32084C40.647 7.35689 40.7093 7.39116 40.8416 7.39116C40.9786 7.39114 41.0426 7.3577 41.0731 7.32475C41.1202 7.26957 41.154 7.19408 41.1668 7.08842L41.1678 7.08354C41.1861 6.9621 41.1952 6.83535 41.1952 6.70366V0.519085H43.4979V6.77006C43.4979 7.55354 43.288 8.17291 42.8436 8.60112H42.8426C42.397 9.02702 41.7193 9.22513 40.8416 9.22514C39.964 9.22514 39.2863 9.02698 38.8407 8.60112H38.8397C38.3953 8.17291 38.1844 7.55359 38.1844 6.77006V0.519085H40.4881Z", // U
        "M48.0535 0.519085C48.8148 0.51912 49.415 0.690885 49.8279 1.05912L49.9734 1.20463C50.2893 1.56162 50.4401 2.04202 50.4402 2.62846V6.52885C50.4402 7.33726 50.2648 7.98462 49.8923 8.44975L49.8914 8.44877C49.5102 8.92969 48.8575 9.14893 47.9832 9.14897H45.0681V0.519085H48.0535ZM47.4421 7.37748H47.6492C47.823 7.37748 47.9262 7.34296 47.9832 7.29838C48.033 7.25926 48.0671 7.1965 48.0671 7.08256V2.78471C48.0671 2.65313 48.0558 2.55305 48.0369 2.481C48.0176 2.40774 47.9942 2.37654 47.9802 2.36479L47.9753 2.36088C47.9577 2.34487 47.9176 2.32193 47.8376 2.30424C47.7593 2.28694 47.6545 2.2769 47.5203 2.2769H47.4421V7.37748Z", // D
        "M56.4869 0.519085V2.42826H54.4606V3.75248H56.4049V5.61869H54.4606V7.22612H56.6217V9.14897H52.0631V0.519085H56.4869Z", // E
        "M60.4745 0.519085L60.5028 0.634319L61.1552 3.37846V0.519085H63.4462V9.14897H61.164L61.1366 9.03569L60.4013 6.06498V9.14897H58.0858V0.519085H60.4745Z", // N
        "M69.6102 0.519085V2.41948H68.3856V9.14897H66.0243V2.41948H64.7997V0.519085H69.6102Z", // T
        "M73.2863 0.443359C74.2458 0.443365 74.966 0.649285 75.4025 1.09961L75.5549 1.27637C75.8862 1.71355 76.0422 2.31462 76.0422 3.05957V3.20996H73.6457V2.4873C73.6457 2.41504 73.6224 2.37248 73.5812 2.34082L73.5783 2.33887C73.5351 2.30399 73.4654 2.27735 73.3508 2.27734C73.2063 2.27734 73.1307 2.31109 73.092 2.34863L73.091 2.34766C73.0498 2.38825 73.0266 2.44307 73.0266 2.52441C73.0266 2.60733 73.0541 2.70791 73.1232 2.82812C73.1705 2.91028 73.2585 3.01091 73.3947 3.12891L73.5471 3.25293L73.548 3.25391L74.7365 4.17578L74.9152 4.31836C75.0903 4.46284 75.2543 4.61391 75.4074 4.77148C75.6197 4.98673 75.7902 5.23857 75.9182 5.52539L75.9641 5.6377C75.0646 5.9064 76.1125 6.21874 76.1125 6.57129C76.1125 7.37546 75.9286 8.02692 75.5412 8.50684C75.1445 8.99999 74.4676 9.22458 73.5617 9.22461C72.6068 9.22461 71.8818 9.03381 71.423 8.61816H71.4221C70.9649 8.19992 70.7522 7.54783 70.7521 6.69922V5.73535H73.091V6.92676C73.0911 7.10164 73.1234 7.2203 73.1721 7.29785C73.209 7.34916 73.2791 7.3916 73.4269 7.3916C73.5982 7.39159 73.6691 7.3499 73.6965 7.31543L73.6984 7.3125C73.7382 7.26509 73.7746 7.16416 73.7746 6.97363C73.7746 6.72932 73.745 6.53524 73.6906 6.38672L73.6896 6.38574C73.6361 6.23692 73.5409 6.09104 73.3977 5.94922L73.3947 5.94629C73.2498 5.79625 73.0436 5.61879 72.7736 5.41309V5.41211L71.8478 4.70215V4.70312C71.1311 4.15659 70.7521 3.51328 70.7521 2.77539C70.7522 2.03645 70.9651 1.45034 71.4103 1.04199V1.04102C71.8572 0.635203 72.4907 0.443359 73.2863 0.443359Z", // S
      ],
  FORUM: [
    "M85.8978 0.519085V2.44291H83.848V3.4683H85.7923V5.3726H83.848V9.14897H81.474V0.519085H85.8978Z", // F
    "M89.9548 0.443359C90.8054 0.443375 91.4762 0.632387 91.9431 1.0332C92.4181 1.43777 92.6462 2.02567 92.6462 2.77051V6.72754C92.6462 7.51748 92.4182 8.14431 91.9421 8.58398C91.4717 9.01887 90.8013 9.22459 89.9548 9.22461C89.1082 9.22461 88.4358 9.0193 87.9617 8.58496L87.9607 8.58398C87.4887 8.14422 87.2624 7.51708 87.2624 6.72754V2.77051C87.2625 2.02611 87.4888 1.43888 87.9597 1.03418V1.0332C88.4304 0.632309 89.1035 0.443359 89.9548 0.443359ZM89.9841 2.27734C89.8442 2.27734 89.7637 2.31874 89.7136 2.37988C89.6589 2.44678 89.6189 2.56377 89.6189 2.75684V6.81738C89.6189 7.06851 89.6583 7.21622 89.7097 7.29102C89.7511 7.34836 89.8255 7.3916 89.9724 7.3916C90.082 7.39157 90.1489 7.3526 90.197 7.27734C90.2524 7.19058 90.2908 7.041 90.2908 6.80762V2.74219C90.2907 2.55146 90.2542 2.43531 90.2058 2.37012C90.1636 2.3135 90.0989 2.27737 89.9841 2.27734Z", // O
    "M97.5709 0.519085C98.1112 0.519131 98.5453 0.619222 98.8512 0.840374H98.8521C99.153 1.05532 99.3521 1.35871 99.4498 1.73979H99.4488C99.5465 2.10236 99.5943 2.52385 99.5943 3.00248C99.5943 3.46979 99.5196 3.85895 99.36 4.15971L99.3609 4.16069C99.2543 4.36634 99.0874 4.52414 98.8707 4.64116C99.0219 4.71957 99.1453 4.82659 99.233 4.9683H99.232C99.384 5.20433 99.4537 5.50091 99.4537 5.84721V9.14897H97.1217V5.73881C97.1217 5.50698 97.0606 5.44283 97.0221 5.42533L97.0182 5.42338C96.9477 5.38846 96.8262 5.36235 96.6432 5.35307V9.14897H94.2574V0.519085H97.5709ZM96.6549 3.60502H97.0025C97.0902 3.60499 97.148 3.57189 97.193 3.49272C97.245 3.40089 97.2799 3.24368 97.2799 3.00248C97.2799 2.84414 97.2726 2.71723 97.2584 2.62065C97.2437 2.52094 97.2235 2.46709 97.2086 2.44291C97.1845 2.40406 97.13 2.36286 96.985 2.36283H96.6549V3.60502Z", // R
    "M103.234 0.519085V6.70366C103.234 6.83536 103.243 6.96209 103.261 7.08354L103.277 7.1558C103.296 7.22394 103.325 7.27787 103.362 7.32084C103.393 7.35689 103.455 7.39116 103.588 7.39116C103.724 7.39114 103.788 7.3577 103.819 7.32475C103.866 7.26957 103.9 7.19408 103.913 7.08842L103.914 7.08354C103.932 6.9621 103.941 6.83535 103.941 6.70366V0.519085H106.244V6.77006C106.244 7.55354 106.034 8.17291 105.589 8.60112H105.588C105.143 9.02702 104.465 9.22513 103.588 9.22514C102.71 9.22514 102.032 9.02698 101.587 8.60112H101.586C101.141 8.17291 100.93 7.55359 100.93 6.77006V0.519085H103.234Z", // U
    "M111.23 0.519085L111.251 0.644085L111.969 4.85209L112.683 0.644085L112.705 0.519085H116.15V9.14897H113.964V4.53276L113.079 9.02787L113.054 9.14897H110.959L110.933 9.02983L109.977 4.45073V9.14897H107.814V0.519085H111.23Z", // M
  ],
};

// Animation variants for different word groups
const ieteVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: i * 0.15,
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const studentsVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => ({
    pathLength: 1,
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1 + i * 0.15,
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const forumVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => ({
    pathLength: 1,
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: 2 + i * 0.15,
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const special = {
  rotateX: 90,
  transition: { duration: 0.4 },
};
const svgAnimate = {
  y: "-100%",
  opacity: 0,
  transition: { duration: 0.4 },
};
const animatedText = {
  opacity: 1,
  transition: { duration: 0.4 },
};

// Hover Expand Card Component
const HoverExpandCard = ({ engineer, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-500 cursor-pointer"
      style={{ height: '400px' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${engineer.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-8">
        {/* Initial State - Name only */}
        <div className="transform transition-all duration-500 group-hover:-translate-y-16">
          <h3 
            className={`text-4xl font-bold text-white mb-2 group-hover:text-5xl transition-all duration-500 ${antonFont.className}`}
          >
            {engineer.name}
          </h3>
        </div>

        {/* Expanded Content - Appears on hover */}
        <div className="absolute bottom-8 left-8 right-8 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-lg">
              {engineer.description}
            </p>
            
            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {engineer.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-200 border border-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={engineer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={engineer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

// Section Divider Component
const SectionDivider = () => {
  return (
    <div className="relative py-24">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-700/50"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-gray-900 px-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // State to control intro animation
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [scope, animate] = useAnimate();
  const [scope2, animate2] = useAnimate();
  const [scope3, animate3] = useAnimate();
  // Add state for navbar scroll
  const [navScrolled, setNavScrolled] = useState(false);

  const engineers = [
    {
      name: "Shouray Soni",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
      description: "Leading the forum with passion for innovation and technological excellence. Specialized in building scalable applications and mentoring fellow developers.",
      skills: ["React", "Node.js", "AI/ML", "Leadership"],
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe"
    },
    {
      name: "Anupam Dwivedi",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b588?w=400&h=600&fit=crop&crop=face",
      description: "Driving technical initiatives and fostering collaboration. Expert in cloud computing, system architecture, and emerging technologies.",
      skills: ["Cloud", "DevOps", "Python", "Architecture"],
      linkedin: "https://linkedin.com/in/janesmith",
      instagram: "https://instagram.com/janesmith"
    },
    {
      name: "Jayesh Bansal",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
      description: "Architecting innovative solutions and mentoring fellow students. Passionate about IoT, embedded systems, and sustainable technology.",
      skills: ["IoT", "Embedded", "C++", "Hardware"],
      linkedin: "https://linkedin.com/in/alexbrown",
      instagram: "https://instagram.com/alexbrown"
    },
    {
      name: "Prerna ",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=face",
      description: "Leading cutting-edge research initiatives in quantum computing and neural networks. Published researcher with multiple IEEE papers.",
      skills: ["Quantum", "Research", "Neural Networks", "IEEE"],
      linkedin: "https://linkedin.com/in/sarahwilson",
      instagram: "https://instagram.com/sarahwilson"
    },
    {
      name: "MICHAEL CHEN",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop&crop=face",
      description: "Orchestrating impactful events and workshops. Specializes in cybersecurity, blockchain technology, and community building.",
      skills: ["Cybersecurity", "Blockchain", "Events", "Community"],
      linkedin: "https://linkedin.com/in/michaelchen",
      instagram: "https://instagram.com/michaelchen"
    },
    {
      name: "EMILY DAVIS",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face",
      description: "Spearheading innovation projects and startup initiatives. Expert in product development, UX design, and emerging tech trends.",
      skills: ["Product", "UX Design", "Innovation", "Startups"],
      linkedin: "https://linkedin.com/in/emilydavis",
      instagram: "https://instagram.com/emilydavis"
    }
  ];

  const animateIETE = async () => {
    // Animate the IETE section
    animate(scope.current, special);
    animate("svg", svgAnimate);
    animate("p", animatedText);
  };

  const animateSTUDENTS = async () => {
    animate2(scope2.current, special);
    animate2("svg", svgAnimate);
    animate2("p", animatedText);
  };
  const animateFORUM = async () => {
    // Animate the FORUM section
    animate3(scope3.current, special);
    animate3("svg", svgAnimate);
    animate3("p", animatedText);
  };
  interface ScrollToPluginConfig {
    y: HTMLElement;
    offsetY: number;
  }

  interface SmoothScrollTweenConfig {
    duration: number;
    scrollTo: ScrollToPluginConfig;
    ease: string;
  }

  const smoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ): void => {
    e.preventDefault();

    const targetElement: HTMLElement | null = document.getElementById(targetId);

    if (targetElement) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          offsetY: 80,
        },
        ease: "power3.inOut",
      } as SmoothScrollTweenConfig);
    }
  };

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);
    const timeouts = [
      setTimeout(() => animateIETE(), 3300),
      setTimeout(() => animateSTUDENTS(), 3600),
      setTimeout(() => animateFORUM(), 3900),
    ];
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 c">
      {/* Intro Animation Overlay */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="flex flex-row special items-center justify-center"
              ref={scope}
            >
              {/* IETE SVG */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 12"
                width="250"
                height="100"
                fill="none"
              >
                {wordPaths.IETE.map((d, i) => (
                  <motion.path
                    key={`iete-${i}`}
                    d={d}
                    stroke="white"
                    strokeWidth="0.35"
                    fill="none"
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    exit="exit"
                    variants={ieteVariants}
                    custom={i}
                  />
                ))}
              </motion.svg>
              <motion.p
                className="animated__text text-white text-4xl text-center absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                style={{
                  pointerEvents: "none",
                  opacity: 0,
                }}
              >
                INFINITESIMAL
              </motion.p>
            </div>

            <div
              className="flex flex-row special items-center justify-center"
              ref={scope2}
            >
              {/* STUDENTS SVG */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="25 0 52 12"
                width="425"
                height="100"
                fill="none"
              >
                {wordPaths.STUDENTS.map((d, i) => (
                  <motion.path
                    key={`students-${i}`}
                    d={d}
                    stroke="white"
                    strokeWidth="0.35"
                    fill="none"
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    exit="exit"
                    variants={studentsVariants}
                    custom={i}
                  />
                ))}
              </motion.svg>
              <motion.p
                className="animated__text text-4xl text-center absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                style={{
                  color: "transparent",
                  WebkitTextStroke: "3px rgb(255, 255, 255)",
                  pointerEvents: "none",
                  opacity: 0,
                }}
              >
                TO
              </motion.p>
            </div>

            <div
              className="flex flex-row special items-center justify-center"
              ref={scope3}
            >
              {/* FORUM SVG */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="81 0 36 12"
                width="400"
                height="100"
                fill="none"
              >
                {wordPaths.FORUM.map((d, i) => (
                  <motion.path
                    key={`forum-${i}`}
                    d={d}
                    stroke="white"
                    strokeWidth="0.35"
                    fill="none"
                    initial="hidden"
                    animate={mounted ? "visible" : "hidden"}
                    exit="exit"
                    variants={forumVariants}
                    custom={i}
                  />
                ))}
              </motion.svg>
              <motion.p
                className="animated__text text-white text-4xl text-center absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                style={{
                  pointerEvents: "none",
                  opacity: 0,
                }}
              >
                INFINITE
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Navigation - Updated with smooth scroll */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: showIntro ? 4 : 0, duration: 0.5 }}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ${
          rubikFont.className
        }
          px-8 py-4 rounded-2xl
          ${
            navScrolled
              ? "bg-black backdrop-blur-xl border border-gray-700/50 shadow-lg shadow-black/50"
              : "bg-transparent border-none shadow-none backdrop-blur-0"
          }
        `}
      >
        <div className="flex items-center space-x-12">
          <Image
            src="/IETE.png"
            alt="IETE Logo"
            width={50}
            height={50}
            className="bg-transparent fill-white"
          />
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              onClick={(e) => smoothScroll(e, "home")}
              className="text-gray-300 font-large animated-underline"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => smoothScroll(e, "about")}
              className="text-gray-300 animated-underline font-large"
            >
              About
            </a>
            <a
              href="#engineers"
              onClick={(e) => smoothScroll(e, "engineers")}
              className="text-gray-300 animated-underline font-large"
            >
              Engineers
            </a>
            <a
              href="#events"
              onClick={(e) => smoothScroll(e, "events")}
              className="text-gray-300 animated-underline font-large"
            >
              Events
            </a>
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, "contact")}
              className="text-gray-300 animated-underline font-large"
            >
              Contact
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Modern Home Section */}
      <motion.section
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative min-h-screen flex items-center"
        id="home"
      >
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="relative w-full h-full bg-black z-1 opacity-90"></div>
          <Image
            src="/OHM_SIR.JPG"
            alt="OHM SIR Background"
            fill
            className="object-cover scale-x-[-1]"
            priority
          />
        </div>
        <div
          id="Title"
          className="relative z-10 max-w-7xl mr-auto px-8 flex flex-col h-full"
        >
          <div>
            <div className="flex justify-center mb-2 items-end">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: showIntro ? 2 : 0, duration: 1 }}
                className={`md:text-7xl font-bold text-gray-100 mb-1 ${antonFont.className} tracking-wide mr-auto`}
                style={{
                  fontSize: "10rem",
                }}
              >
                IETE
              </motion.h1>
            </div>
            <div className="flex justify-center mb-2 items-end mr-auto">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: showIntro ? 2 : 0, duration: 1 }}
                className={`md:text-7xl font-bold text-gray-100 mb-4 ${antonFont.className} tracking-wide mr-auto`}
                style={{
                  fontSize: "10rem",
                  color: "transparent",
                  WebkitTextStroke: "5px rgb(255, 255, 255)",
                }}
              >
                STUDENTS
              </motion.h1>
            </div>
            <div className="flex justify-center mb-2 items-end">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: showIntro ? 2 : 0, duration: 1 }}
                className={`md:text-7xl font-bold text-gray-100 mb-1 ${antonFont.className} tracking-wide mr-auto`}
                style={{
                  fontSize: "10rem",
                }}
              >
                FORUM
              </motion.h1>
            </div>
          </div>
        </div>
      </motion.section>


      {/* Modern About Section */}
      <motion.section
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative min-h-screen flex items-center"
        id="about"
      >
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="relative w-full h-full bg-white z-1 opacity-90"></div>
        </div>
        <div
          id="Title"
          className="relative z-10 max-w-7xl mr-auto px-8 flex flex-col h-full"
        >
          <div>
            <div className="flex justify-center mb-2 items-end">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className={`md:text-7xl font-bold text-black-100 mb-1 ${antonFont.className} tracking-wide mr-auto`}
                style={{
                  fontSize: "8rem",
                }}
              >
                ABOUT US
              </motion.h1>
            </div>
            <div className="flex justify-center mb-2 items-end mr-auto">
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className={`md:text-7xl font-bold text-gray-100 mb-4 ${antonFont.className} tracking-wide mr-auto`}
                style={{
                  fontSize: "5rem",
                  color: "transparent",
                  WebkitTextStroke: "5px rgb(15, 13, 13)",
                }}
              >
                Who We Are
              </motion.h1>
            </div>
          </div>
          <div className="max-w-4xl mt-12">
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-xl text-black-300 leading-relaxed mb-8"
            >
              The IETE Students Forum is a vibrant community dedicated to fostering innovation, collaboration, and growth among aspiring engineers and technologists. Established under the Institution of Electronics and Telecommunication Engineers (IETE), we are committed to bridging the gap between academic learning and industry expertise.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-xl text-black-300 leading-relaxed mb-8"
            >
              Our mission is to empower students to explore cutting-edge technologies, develop hands-on skills, and build networks that propel them toward successful careers in electronics, telecommunication, and related fields. Through workshops, hackathons, mentorship programs, and industry interactions, we provide a platform for students to transform their ideas into reality.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-xl text-black-300 leading-relaxed"
            >
              Whether you're a beginner or a seasoned tech enthusiast, our community welcomes everyone with a passion for learning and innovation. Join us to connect with like-minded peers, learn from industry leaders, and make a lasting impact in the world of technology.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Updated Engineers Section with Hover Expand Cards */}
      <motion.section
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative min-h-screen flex items-center py-32"
        id="engineers"
      >
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <div className="relative w-full h-full bg-black z-1 opacity-90"></div>
        </div>
        <div
          id="Title"
          className="relative z-10 max-w-7xl mr-auto px-8 flex flex-col h-full w-full"
        >
          <div>
            <div className="flex justify-center mb-2 items-end">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className={`md:text-7xl font-bold text-gray-100 mb-1 ${antonFont.className} tracking-wide mr-auto`}
                style={{
                  fontSize: "7rem",
                }}
              >
                OUR
              </motion.h1>
            </div>
            <div className="flex justify-center mb-2 items-end mr-auto">
              <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className={`md:text-7xl font-bold text-gray-100 mb-4 ${antonFont.className} tracking-wide mr-auto`}
                style={{
                  fontSize: "7rem",
                  color: "transparent",
                  WebkitTextStroke: "5px rgb(255, 255, 255)",
                }}
              >
                ENGINEERS
              </motion.h1>
            </div>
          </div>
          
          {/* Engineers Grid with Hover Expand Cards */}
          <div className="max-w-7xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {engineers.map((engineer, index) => (
              <HoverExpandCard 
                key={engineer.name} 
                engineer={engineer} 
                delay={index * 0.2} 
              />
            ))}
          </div>
        </div>
      </motion.section>



      {/* Modern Events Section */}
      <section id="events" className="py-32 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-4 py-2 bg-[#2496FE]/20 rounded-full text-[#2496FE] text-sm font-medium mb-6">
              Upcoming Events
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-100 mb-8">
              What's <span className="text-[#2496FE]">Next</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50">
              <div className="h-48 bg-gradient-to-br from-[#2496FE] to-[#1e7ce8] relative">
                <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-medium">
                  Workshop
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-[#2496FE] font-semibold mb-3">
                  March 15, 2024
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  React Masterclass
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Deep dive into React 18 features, hooks, and modern
                  development patterns.
                </p>
                <button className="text-[#2496FE] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More →
                </button>
              </div>
            </div>

            <div className="group bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-medium">
                  Conference
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-purple-500 font-semibold mb-3">
                  March 22, 2024
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  AI Revolution Summit
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Explore the latest in AI/ML with industry experts and hands-on
                  demos.
                </p>
                <button className="text-purple-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Register Now →
                </button>
              </div>
            </div>

            <div className="group bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50">
              <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-500 relative">
                <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-medium">
                  Hackathon
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-green-500 font-semibold mb-3">
                  March 29-31, 2024
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-100">
                  TechClub Hackathon
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  48 hours of coding, creativity, and collaboration with $10K in
                  prizes.
                </p>
                <button className="text-green-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Join Competition →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Modern Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-100 mb-8">
              Let's <span className="text-[#2496FE]">Connect</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Ready to join our community? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl shadow-black/50">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#2496FE]/20 rounded-2xl flex items-center justify-center">
                    <span className="text-[#2496FE] text-xl">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-100">Email Us</div>
                    <div className="text-gray-300">
                      hello@techclub.university.edu
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#2496FE]/20 rounded-2xl flex items-center justify-center">
                    <span className="text-[#2496FE] text-xl">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-100">Visit Us</div>
                    <div className="text-gray-300">
                      Innovation Center, Room 304
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#2496FE]/20 rounded-2xl flex items-center justify-center">
                    <span className="text-[#2496FE] text-xl">💬</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-100">Discord</div>
                    <div className="text-gray-300">@TechClubCommunity</div>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-[#2496FE] focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-[#2496FE] focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-200"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-6 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-[#2496FE] focus:border-transparent transition-all duration-300 placeholder-gray-400 text-gray-200"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#2496FE] text-white py-4 rounded-2xl font-semibold hover:bg-[#1e7ce8] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#2496FE]/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-8">
            <div className="text-3xl font-bold text-[#2496FE]">TechClub</div>
            <p className="text-gray-300 max-w-md mx-auto">
              Empowering the next generation of technologists and innovators.
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="#"
                className="text-gray-400 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                Discord
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                Instagram
              </a>
            </div>
            <div className="text-sm text-gray-400 pt-8 border-t border-gray-800">
              © 2024 TechClub. Crafted with passion for innovation.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}