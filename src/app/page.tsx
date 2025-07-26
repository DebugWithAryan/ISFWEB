"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  // State to control intro animation
  const [showIntro, setShowIntro] = useState(true);

  // References for GSAP animations
  const isfRef = useRef(null);
  const thinkRef = useRef(null);
  const planRef = useRef(null);
  const buildRef = useRef(null);
  const introRef = useRef(null);

  // Smooth scroll function
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

    // Get the target element
    const targetElement: HTMLElement | null = document.getElementById(targetId);

    if (targetElement) {
      // Use GSAP to animate scrolling
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetElement,
          offsetY: 80, // Offset to account for fixed navbar
        },
        ease: "power3.inOut",
      } as SmoothScrollTweenConfig);
    }
  };

  useEffect(() => {
    // GSAP animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide intro after animation completes
        gsap.to(introRef.current, {
          opacity: 0,
          duration: 1,
          onComplete: () => setShowIntro(false),
        });
      },
    });

    // Animate ISF
    tl.fromTo(
      isfRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // Hide ISF and show "Think"
    tl.to(isfRef.current, { opacity: 0, duration: 0.5 }, "+=0.5");
    tl.fromTo(
      thinkRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out" }
    );

    // Then "Plan"
    tl.fromTo(
      planRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out" },
      "+=0.3"
    );

    // Then "Build"
    tl.fromTo(
      buildRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out" },
      "+=0.3"
    );

    // Pause briefly to show all words together
    tl.to([thinkRef.current, planRef.current, buildRef.current], {}, "+=1");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Intro Animation Overlay */}
      <AnimatePresence>
        {showIntro && (
          <div
            ref={introRef}
            className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center"
          >
            <div ref={isfRef} className="text-8xl font-bold text-[#2496FE]">
              ISF
            </div>
            <div className="flex space-x-6 mt-8">
              <div ref={thinkRef} className="text-5xl font-bold text-gray-900">
                Think
              </div>
              <div ref={planRef} className="text-5xl font-bold text-[#2496FE]">
                Plan
              </div>
              <div
                ref={buildRef}
                className="text-5xl font-bold text-purple-500"
              >
                Build
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Navigation - Updated with smooth scroll */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: showIntro ? 4 : 0, duration: 0.5 }}
        //@ts-ignore
        className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-8 py-4 z-50 shadow-lg shadow-black/5"
      >
        <div className="flex items-center space-x-12">
          <div className="text-xl font-bold text-[#2496FE]">TechClub</div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              onClick={(e) => smoothScroll(e, "home")}
              className="text-gray-600 hover:text-[#2496FE] transition-all duration-300 text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => smoothScroll(e, "about")}
              className="text-gray-600 hover:text-[#2496FE] transition-all duration-300 text-sm font-medium"
            >
              About
            </a>
            <a
              href="#events"
              onClick={(e) => smoothScroll(e, "events")}
              className="text-gray-600 hover:text-[#2496FE] transition-all duration-300 text-sm font-medium"
            >
              Events
            </a>
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, "contact")}
              className="text-gray-600 hover:text-[#2496FE] transition-all duration-300 text-sm font-medium"
            >
              Contact
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              //@ts-ignore
              className="bg-[#2496FE] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#1e7ce8] transition-all duration-300"
            >
              Join Now
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Modern Layout */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: showIntro ? 4.2 : 0.2, duration: 1 }}
        //@ts-ignore
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          //@ts-ignore
          className="absolute top-20 right-20 w-72 h-72 bg-[#2496FE]/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1,
          }}
          //@ts-ignore
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
        ></motion.div>

        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <div className="space-y-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: showIntro ? 4.4 : 0.4, duration: 0.8 }}
              //@ts-ignore
              className="inline-flex items-center px-4 py-2 bg-[#2496FE]/10 rounded-full text-[#2496FE] text-sm font-medium mb-8"
            >
              ✨ Welcome to the future of learning
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: showIntro ? 4.6 : 0.6, duration: 0.8 }}
              //@ts-ignore
              className="text-6xl md:text-8xl font-bold tracking-tight"
            >
              <span className="text-gray-900">Tech</span>
              <span className="text-[#2496FE]">Club</span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: showIntro ? 4.8 : 0.8, duration: 0.8 }}
              //@ts-ignore
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Where brilliant minds converge to shape tomorrow's technology.
              <br className="hidden md:block" />
              Join our community of innovators and creators.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: showIntro ? 5 : 1, duration: 0.8 }}
              //@ts-ignore
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                //@ts-ignore
                className="group bg-[#2496FE] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#1e7ce8] transition-all duration-300 hover:shadow-2xl hover:shadow-[#2496FE]/25"
              >
                Get Started
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                //@ts-ignore
                className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-[#2496FE] hover:text-[#2496FE] transition-all duration-300 bg-white/50 backdrop-blur-sm"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Modern Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        //@ts-ignore
        className="py-32 relative"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats items with staggered animations */}
            {[
              {
                number: "500+",
                title: "Active Members",
                subtitle: "Growing every semester",
              },
              {
                number: "50+",
                title: "Events Hosted",
                subtitle: "This academic year",
              },
              {
                number: "15+",
                title: "Industry Partners",
                subtitle: "Leading tech companies",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                //@ts-ignore
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10"
              >
                <div className="text-4xl font-bold text-[#2496FE] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.title}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modern About Section with Bento Grid */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-6">
              About Our Community
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              What We're <span className="text-[#2496FE]">About</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're building more than just a club – we're creating a ecosystem
              where technology meets creativity.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2 bg-gradient-to-br from-[#2496FE] to-[#1e7ce8] rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute top-8 right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6">💻</div>
                <h3 className="text-3xl font-bold mb-4">Hands-on Learning</h3>
                <p className="text-xl text-blue-100 leading-relaxed">
                  From beginner workshops to advanced hackathons, we learn by
                  building real projects that matter.
                </p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:scale-105 transition-all duration-500">
              <div className="text-4xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Innovation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Push boundaries and explore emerging technologies in AI,
                blockchain, and beyond.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 hover:scale-105 transition-all duration-500">
              <div className="text-4xl mb-6">🌐</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Networking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with industry leaders, alumni, and peers who share your
                passion for technology.
              </p>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-3xl font-bold mb-4">Career Focus</h3>
                <p className="text-xl text-purple-100 leading-relaxed">
                  Get internship opportunities, mentorship, and direct
                  connections to top tech companies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Events Section */}
      <section id="events" className="py-32 bg-white/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-4 py-2 bg-[#2496FE]/10 rounded-full text-[#2496FE] text-sm font-medium mb-6">
              Upcoming Events
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              What's <span className="text-[#2496FE]">Next</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10">
              <div className="h-48 bg-gradient-to-br from-[#2496FE] to-[#1e7ce8] relative">
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-medium">
                  Workshop
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-[#2496FE] font-semibold mb-3">
                  March 15, 2024
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  React Masterclass
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Deep dive into React 18 features, hooks, and modern
                  development patterns.
                </p>
                <button className="text-[#2496FE] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Learn More →
                </button>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-medium">
                  Conference
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-purple-500 font-semibold mb-3">
                  March 22, 2024
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  AI Revolution Summit
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Explore the latest in AI/ML with industry experts and hands-on
                  demos.
                </p>
                <button className="text-purple-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Register Now →
                </button>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/50 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10">
              <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-500 relative">
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1 text-white text-sm font-medium">
                  Hackathon
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm text-green-500 font-semibold mb-3">
                  March 29-31, 2024
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  TechClub Hackathon
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
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
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Let's <span className="text-[#2496FE]">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to join our community? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-gray-200/50 shadow-2xl shadow-black/5">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#2496FE]/10 rounded-2xl flex items-center justify-center">
                    <span className="text-[#2496FE] text-xl">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email Us</div>
                    <div className="text-gray-600">
                      hello@techclub.university.edu
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#2496FE]/10 rounded-2xl flex items-center justify-center">
                    <span className="text-[#2496FE] text-xl">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Visit Us</div>
                    <div className="text-gray-600">
                      Innovation Center, Room 304
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#2496FE]/10 rounded-2xl flex items-center justify-center">
                    <span className="text-[#2496FE] text-xl">💬</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Discord</div>
                    <div className="text-gray-600">@TechClubCommunity</div>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2496FE] focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2496FE] focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#2496FE] focus:border-transparent transition-all duration-300 placeholder-gray-500"
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
      <footer className="py-16 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-8">
            <div className="text-3xl font-bold text-[#2496FE]">TechClub</div>
            <p className="text-gray-600 max-w-md mx-auto">
              Empowering the next generation of technologists and innovators.
            </p>
            <div className="flex justify-center space-x-8">
              <a
                href="#"
                className="text-gray-500 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                Discord
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#2496FE] transition-colors duration-300 font-medium"
              >
                Instagram
              </a>
            </div>
            <div className="text-sm text-gray-500 pt-8 border-t border-gray-200/50">
              © 2024 TechClub. Crafted with passion for innovation.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
