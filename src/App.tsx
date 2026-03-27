/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";
import { Globe as GlobeIcon } from "lucide-react";
import { Globe } from "./components/Globe";
import { 
  Rocket, 
  Users, 
  Target, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MessageSquare,
  Camera,
  Share2,
  TrendingUp,
  Award,
  X,
  Youtube,
  Mail,
  Phone,
  User,
  Send,
  Sun,
  Moon,
  ShoppingBag,
  Dumbbell,
  Smartphone,
  Palmtree,
  Video,
  Sparkles,
  Monitor,
  Wallet,
  Star,
  Briefcase,
  Coffee,
  ShieldCheck,
  BarChart3,
  Globe2,
  Lightbulb
} from "lucide-react";

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Coffee className="w-8 h-8" />,
    title: "Cup of Tea Awards",
    description: "Celebrate creativity and innovation with our unique awards system.",
    details: "Our Cup of Tea Awards recognize the most innovative campaigns and creative content creators in our network. We believe in celebrating the 'perfect brew' of strategy and creativity that leads to exceptional brand growth."
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8" />,
    title: "Expert Team",
    description: "Work with highly skilled professionals delivering premium results.",
    details: "Our team consists of industry veterans with years of experience in digital PR, influencer management, and brand strategy. We bring a wealth of knowledge to every project, ensuring your brand is in the best hands."
  },
  {
    id: 3,
    icon: <Rocket className="w-8 h-8" />,
    title: "Fast Growth Strategy",
    description: "Boost your brand quickly with smart digital strategies.",
    details: "We don't just aim for growth; we aim for accelerated, sustainable expansion. Our data-driven strategies are designed to identify the fastest paths to market dominance for your specific niche."
  },
  {
    id: 4,
    icon: <Target className="w-8 h-8" />,
    title: "Targeted Marketing",
    description: "Reach the right audience with precision campaigns.",
    details: "Precision is at the heart of what we do. We use advanced analytics to ensure your message reaches the exact demographic most likely to convert, maximizing your ROI and minimizing wasted ad spend."
  },
  {
    id: 5,
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Creative Ideas",
    description: "Unique and innovative concepts for your business.",
    details: "In a crowded digital landscape, standing out is mandatory. Our creative lab generates 'out-of-the-box' concepts that capture attention and foster deep emotional connections between brands and their audiences."
  },
  {
    id: 6,
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Secure System",
    description: "Your data and platform are fully protected.",
    details: "Security is non-negotiable. We employ enterprise-grade security protocols to protect your brand's data and ensure that every transaction and interaction within our network is safe and secure."
  },
  {
    id: 7,
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Analytics Dashboard",
    description: "Real-time insights and performance tracking.",
    details: "Knowledge is power. Our comprehensive analytics dashboard provides real-time visibility into your campaign performance, allowing for agile adjustments and clear reporting on every metric that matters."
  },
  {
    id: 8,
    icon: <Globe2 className="w-8 h-8" />,
    title: "Global Reach",
    description: "Expand your brand worldwide effortlessly.",
    details: "The world is your marketplace. With our extensive global network of influencers and media partners, we help you transcend borders and establish a powerful presence in international markets."
  }
];

const FeatureCard: React.FC<{ feature: Feature, onClick: () => void, isDarkMode: boolean }> = ({ feature, onClick, isDarkMode }) => {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={`group relative p-8 rounded-[2rem] cursor-pointer transition-all duration-500 ${
        isDarkMode 
          ? 'glass-card border-white/10 hover:shadow-[0_0_30px_rgba(255,122,0,0.2)]' 
          : 'glass-card-light border-black/5 hover:shadow-[0_20px_40px_rgba(255,122,0,0.15)]'
      }`}
    >
      <div className={`mb-6 p-4 rounded-2xl inline-block transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
        isDarkMode ? 'bg-white/5 text-[#ff7a00]' : 'bg-[#ff7a00]/10 text-[#ff7a00]'
      }`}>
        {feature.icon}
      </div>
      <h4 className="text-xl font-bold mb-3 group-hover:text-[#ff7a00] transition-colors">{feature.title}</h4>
      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
        {feature.description}
      </p>
      
      {/* Subtle Glow Effect */}
      <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-[#ff7a00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};

interface MagneticBallProps {
  children: React.ReactNode;
  className?: string;
}

const MagneticBall: React.FC<MagneticBallProps> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 120, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springZ = useSpring(z, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const radius = 400; // Even larger repulsion radius for smoother entry
    const strength = 120; // Slightly stronger repulsion

    if (distance < radius) {
      const angle = Math.atan2(distanceY, distanceX);
      // Use a smoother power falloff for the force
      const force = Math.pow((radius - distance) / radius, 1.5);
      
      x.set(-Math.cos(angle) * force * strength);
      y.set(-Math.sin(angle) * force * strength);
      z.set(force * 60);
      rotateX.set(Math.sin(angle) * force * 25);
      rotateY.set(-Math.cos(angle) * force * 25);
    } else {
      x.set(0);
      y.set(0);
      z.set(0);
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        style={{ 
          x: springX, 
          y: springY, 
          z: springZ,
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d"
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

const OrderForm = ({ onSubmitSuccess, isDarkMode }: { onSubmitSuccess: () => void, isDarkMode: boolean }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "209ef5a3-981a-45bb-b19e-2678ad5edaa4");
    formData.append("subject", "New Order from RA Media Website");
    formData.append("from_name", "RA Media Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onSubmitSuccess();
          // Reset success state after modal closes
          setTimeout(() => setIsSuccess(false), 500);
        }, 3000);
      } else {
        alert('Something went wrong. Please try again or contact us directly.');
      }
    } catch (error) {
      alert('An error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[400px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form 
            key="order-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-4" 
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="Enter your name"
                  className={`w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-white/20 text-white' : 'bg-black/5 border-black/10 focus:border-black/20 text-black'}`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>YouTube Channel Name</label>
                <div className="relative">
                  <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    required
                    name="channel_name"
                    type="text" 
                    placeholder="Channel Name"
                    className={`w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-white/20 text-white' : 'bg-black/5 border-black/10 focus:border-black/20 text-black'}`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>YouTube Channel Link</label>
                <div className="relative">
                  <GlobeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    required
                    name="channel_link"
                    type="url" 
                    placeholder="youtube.com/..."
                    className={`w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-white/20 text-white' : 'bg-black/5 border-black/10 focus:border-black/20 text-black'}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="email@example.com"
                    className={`w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-white/20 text-white' : 'bg-black/5 border-black/10 focus:border-black/20 text-black'}`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    required
                    name="phone"
                    type="tel" 
                    placeholder="+91 ..."
                    className={`w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-white/20 text-white' : 'bg-black/5 border-black/10 focus:border-black/20 text-black'}`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Message / Requirements</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-zinc-500" />
                <textarea 
                  required
                  name="message"
                  placeholder="Tell us about your campaign goals..."
                  rows={4}
                  className={`w-full border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-colors resize-none ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-white/20 text-white' : 'bg-black/5 border-black/10 focus:border-black/20 text-black'}`}
                ></textarea>
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              type="submit"
              className={`w-full mt-4 py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5' : 'bg-black text-white hover:bg-zinc-800 shadow-lg shadow-black/5'}`}
            >
              {isSubmitting ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Place Order
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                damping: 12, 
                stiffness: 200, 
                delay: 0.2 
              }}
              className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold mb-3"
            >
              Order Received!
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
            >
              Thank you for choosing RA Media. <br /> Our team will contact you shortly.
            </motion.p>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, delay: 0.5, ease: "linear" }}
              className={`h-1 mt-12 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}
            >
              <div className={`h-full rounded-full ${isDarkMode ? 'bg-white' : 'bg-black'}`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SplashScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[200] bg-white flex items-center justify-center overflow-hidden"
    >
      <div className="relative">
        {/* Ambient Glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-black blur-[100px] rounded-full"
        />
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: 1 
          }}
          transition={{ 
            duration: 1.5, 
            times: [0, 0.7, 1],
            ease: "easeOut",
            delay: 0.2
          }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full"
            >
              <motion.img
                src="https://i.ibb.co.com/60Y5Z5qG/image.png"
                alt="RA Media Logo"
                className="w-full h-full object-cover rounded-full border-2 border-black/20 shadow-[0_0_60px_rgba(0,0,0,0.1)]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 border-2 border-black/10 rounded-full border-t-black/60"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1, delay: 1 }}
            className="text-black font-bold text-2xl md:text-4xl tracking-[0.2em]"
          >
            RA MEDIA
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-black/50 to-transparent mt-4 w-48"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen key="splash" onComplete={() => {}} />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-black text-white selection:bg-white selection:text-black' : 'bg-white text-black selection:bg-black selection:text-white'}`}
      >
      {/* Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
        <div className={`max-w-7xl mx-auto h-16 px-6 flex items-center justify-between rounded-full border transition-all duration-500 pointer-events-auto ${isDarkMode ? 'glass border-white/10' : 'glass-light border-black/5'} relative overflow-hidden`}>
          <div className={`absolute inset-0 rounded-full border pointer-events-none ${isDarkMode ? 'border-white/5' : 'border-white/20'}`} />
          <div className="flex items-center gap-4 relative z-10">
            <img 
              src="https://i.ibb.co.com/60Y5Z5qG/image.png" 
              alt="RA MEDIA" 
              className="h-9 w-9 rounded-full object-cover border border-white/10" 
              referrerPolicy="no-referrer"
            />
            <div className="text-xl font-bold tracking-tighter hidden sm:block">RA MEDIA</div>
          </div>
          <div className={`hidden lg:flex items-center gap-8 text-sm font-medium transition-colors relative z-10 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
            <a href="#influencers" className="hover:text-white transition-colors">For Influencers</a>
            <a href="#network" className="hover:text-white transition-colors">Network</a>
            <a href="#creators" className="hover:text-white transition-colors">Featured Creators</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all hover:scale-110 ${isDarkMode ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-black/5 text-orange-500 hover:bg-black/10'}`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setShowOrderForm(true)}
              className={`px-5 py-2 text-sm font-bold rounded-full transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showOrderForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowOrderForm(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full max-w-xl p-8 rounded-[2.5rem] border shadow-2xl ${isDarkMode ? 'glass-card border-white/10' : 'glass-card-light border-black/5'}`}
            >
              <button 
                onClick={() => setShowOrderForm(false)}
                className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Place Your Order</h2>
                <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Fill in the details below to start your campaign.</p>
              </div>

              <OrderForm onSubmitSuccess={() => setShowOrderForm(false)} isDarkMode={isDarkMode} />
            </motion.div>
          </motion.div>
        )}

        {selectedFeature && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedFeature(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl p-10 rounded-[3rem] border shadow-2xl overflow-hidden ${isDarkMode ? 'glass-card border-white/10' : 'glass-card-light border-black/5'}`}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#ff7a00] to-transparent" />
              
              <button 
                onClick={() => setSelectedFeature(null)}
                className={`absolute top-8 right-8 p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className={`mb-8 p-6 rounded-3xl ${isDarkMode ? 'bg-white/5 text-[#ff7a00]' : 'bg-[#ff7a00]/10 text-[#ff7a00]'}`}
                >
                  {selectedFeature.icon}
                </motion.div>
                
                <h2 className="text-4xl font-bold mb-6 tracking-tight">{selectedFeature.title}</h2>
                <p className={`text-xl leading-relaxed mb-8 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {selectedFeature.details}
                </p>
                
                <button 
                  onClick={() => {
                    setSelectedFeature(null);
                    setShowOrderForm(true);
                  }}
                  className="px-8 py-4 bg-[#ff7a00] text-white font-bold rounded-full hover:bg-[#e66e00] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#ff7a00]/20"
                >
                  Get Started with this Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className={`relative pt-40 pb-20 px-6 overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-zinc-800/20' : 'bg-zinc-200/40'}`} />
          <div className={`absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] blur-[100px] rounded-full ${isDarkMode ? 'bg-zinc-700/10' : 'bg-zinc-100/20'}`} />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center text-left">
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8 ${isDarkMode ? 'glass border-white/10 text-zinc-400' : 'bg-zinc-50 border-black/5 text-zinc-500'}`}
              >
                <Rocket className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                <span>Influencer Marketing & Digital PR Agency</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 ${isDarkMode ? 'text-gradient' : 'text-black'}`}
              >
                Scale Your Brand with <br /> Powerful Influencer Marketing
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`max-w-2xl text-lg md:text-xl mb-12 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
              >
                At RA Media, we connect brands with the right influencers to create impactful campaigns that drive real engagement, visibility, and sales.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center gap-4"
              >
                <button 
                  onClick={() => setShowOrderForm(true)}
                  className={`w-full md:w-auto px-8 py-4 font-bold rounded-full flex items-center justify-center gap-2 transition-all group ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'}`}
                >
                  Start Your Campaign Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className={`w-full md:w-auto px-8 py-4 font-bold rounded-full transition-all ${isDarkMode ? 'glass text-white hover:bg-white/10' : 'bg-zinc-50 border border-black/5 text-black hover:bg-zinc-100'}`}>
                  View Case Studies
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-500/5 to-transparent blur-3xl rounded-full" />
              <Globe className="w-full max-w-[600px] mx-auto" />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { label: "Verified Influencers", value: "200+" },
              { label: "Campaign Strategy", value: "Data-Driven" },
              { label: "Brand Collaborations", value: "Global" },
              { label: "Audience Engagement", value: "Authentic" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className={`text-xs uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950/50' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>About RA Media</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Modern Influencer Marketing <br /> for the Digital Age
              </h3>
              <p className={`text-lg mb-6 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                RA Media is a modern Influencer Marketing & Digital PR Agency focused on helping brands grow through powerful social media collaborations.
              </p>
              <p className={`text-lg mb-8 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                We specialize in connecting brands with trusted influencers, content creators, and digital personalities across industries including:
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Fashion", "Lifestyle", "Technology", "Fitness", "Beauty", "Startups"].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <CheckCircle2 className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className={`p-6 rounded-2xl ${isDarkMode ? 'glass-card' : 'glass-card-light border border-black/5'}`}>
                <p className={`italic ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  "Our mission is simple: Help brands reach the right audience through authentic influencer storytelling."
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden glass border border-white/10 p-4">
                <img 
                  src="https://i.ibb.co.com/hF8XMtkp/file-00000000894472069f26eb16c8d7ce13.png" 
                  alt="RA Media" 
                  className="w-full h-full object-cover rounded-2xl opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-card p-8 rounded-2xl hidden md:block border border-white/10">
                <div className="text-4xl font-bold mb-1">200+</div>
                <div className="text-sm text-zinc-400">Verified Influencers</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeIn} className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Our Services</motion.h2>
            <motion.h3 {...fadeIn} className="text-4xl md:text-5xl font-bold">Comprehensive Marketing Solutions</motion.h3>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Influencer Marketing",
                desc: "We plan and execute influencer campaigns that promote your brand to highly engaged audiences."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Brand Promotions",
                desc: "Boost brand awareness through trusted creators who influence consumer decisions."
              },
              {
                icon: <GlobeIcon className="w-8 h-8" />,
                title: "Digital PR",
                desc: "Build credibility and reputation with strategic digital media exposure."
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Social Media Management",
                desc: "Complete management of your brand's social presence with content planning and engagement."
              },
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Content Creation",
                desc: "High-quality photos, videos, and reels designed for maximum social media impact."
              },
              {
                icon: <Share2 className="w-8 h-8" />,
                title: "Influencer Outreach",
                desc: "We find and negotiate with the right influencers to match your brand vision and goals."
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className={`p-8 rounded-3xl transition-all ${isDarkMode ? 'glass-card' : 'glass-card-light border border-black/5'}`}
              >
                <div className={`mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>{service.icon}</div>
                <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                <p className={`leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950/50' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className={`p-6 rounded-2xl aspect-square flex flex-col justify-center items-center text-center ${isDarkMode ? 'glass-card' : 'glass-card-light border border-black/5'}`}>
                  <Award className="w-10 h-10 mb-4" />
                  <div className="font-bold">Verified Network</div>
                </div>
                <div className={`p-6 rounded-2xl aspect-square flex flex-col justify-center items-center text-center ${isDarkMode ? 'glass-card' : 'glass-card-light border border-black/5'}`}>
                  <Zap className="w-10 h-10 mb-4" />
                  <div className="font-bold">High Engagement</div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className={`p-6 rounded-2xl aspect-square flex flex-col justify-center items-center text-center ${isDarkMode ? 'glass-card' : 'glass-card-light border border-black/5'}`}>
                  <Target className="w-10 h-10 mb-4" />
                  <div className="font-bold">Creative Strategy</div>
                </div>
                <div className={`p-6 rounded-2xl aspect-square flex flex-col justify-center items-center text-center ${isDarkMode ? 'glass-card' : 'glass-card-light border border-black/5'}`}>
                  <Users className="w-10 h-10 mb-4" />
                  <div className="font-bold">Expert Outreach</div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeIn}>
              <h2 className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Why Choose RA Media</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">Why Brands Trust Us</h3>
              <div className="space-y-6">
                {[
                  "200+ Verified Influencers Network",
                  "Strong Negotiation & Outreach Expertise",
                  "Creative Campaign Strategy",
                  "Affordable Marketing Solutions",
                  "High Engagement Results"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/10 group-hover:bg-white group-hover:text-black' : 'bg-black/5 group-hover:bg-black group-hover:text-white'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className={`text-lg font-medium ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{item}</span>
                  </div>
                ))}
              </div>
              <p className={`mt-12 text-lg italic border-l-2 pl-6 ${isDarkMode ? 'text-zinc-400 border-white/20' : 'text-zinc-500 border-black/10'}`}>
                "We focus on authentic collaborations that deliver measurable results."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Services Section */}
      <section id="features" className={`py-24 px-6 overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex items-start gap-6">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="p-4 rounded-2xl border-2 border-[#ff7a00] text-[#ff7a00] bg-[#ff7a00]/5"
              >
                <Coffee className="w-10 h-10" />
              </motion.div>
              <div>
                <motion.h2 {...fadeIn} className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Premium Experience</motion.h2>
                <motion.h3 {...fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight">Our Features & <br /> <span className="text-[#ff7a00]">Services</span></motion.h3>
              </div>
            </div>
            <motion.p 
              {...fadeIn}
              className={`max-w-md text-lg ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}
            >
              Elevating brands through a blend of creative excellence and strategic precision.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id} 
                feature={feature} 
                isDarkMode={isDarkMode}
                onClick={() => setSelectedFeature(feature)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Influencers */}
      <section id="influencers" className={`py-24 px-6 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
          <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] transition-colors duration-500 ${isDarkMode ? 'from-zinc-800 via-transparent to-transparent' : 'from-zinc-200 via-transparent to-transparent'}`} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div {...fadeIn} className={`p-12 md:p-20 rounded-[3rem] ${isDarkMode ? 'glass-card' : 'glass-card-light border border-black/5'}`}>
            <h2 className={`text-sm font-bold uppercase tracking-[0.3em] mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>For Influencers</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-8">Join Our Influencer Network</h3>
            <p className={`text-lg mb-12 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Are you a content creator looking to collaborate with brands? 
              Join the RA Media Influencer Network and get access to paid collaborations, brand partnerships, and exciting campaigns.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                "Paid Brand Deals",
                "Long-Term Partnerships",
                "Campaign Collabs",
                "Global Exposure"
              ].map((benefit, i) => (
                <div key={i} className={`p-4 rounded-2xl border text-sm font-medium ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
                  {benefit}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowOrderForm(true)}
              className={`px-10 py-5 font-bold rounded-full transition-all ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-black text-white hover:bg-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.1)]'}`}
            >
              Apply to Join Our Network
            </button>
          </motion.div>
        </div>
      </section>

      {/* Our Network */}
      <section id="network" className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950/50' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeIn} className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Our Network</motion.h2>
            <motion.h3 {...fadeIn} className="text-4xl md:text-5xl font-bold">Influencers Across All Niches</motion.h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto relative">
            {[
              { label: "Fashion Creators", icon: <ShoppingBag className="w-8 h-8 md:w-10 md:h-10" />, z: 10 },
              { label: "Fitness Influencers", icon: <Dumbbell className="w-8 h-8 md:w-10 md:h-10" />, z: -10 },
              { label: "Tech Reviewers", icon: <Smartphone className="w-8 h-8 md:w-10 md:h-10" />, z: 20 },
              { label: "Lifestyle Bloggers", icon: <Palmtree className="w-8 h-8 md:w-10 md:h-10" />, z: -20 },
              { label: "Content Creators", icon: <Video className="w-8 h-8 md:w-10 md:h-10" />, z: 30 },
              { label: "Beauty Influencers", icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10" />, z: 0 }
            ].map((niche, i) => (
              <div 
                key={i} 
                className="flex justify-center items-center"
              >
                <MagneticBall>
                  <motion.div 
                    variants={scaleIn}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-50px" }}
                    className={`relative w-36 h-36 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center text-center transition-all duration-500 group ${isDarkMode ? 'glass-sphere border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'bg-white border border-black/5 shadow-xl'}`}
                    style={{
                      transform: `translateZ(${niche.z}px)`
                    }}
                  >
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <div className="absolute top-2 left-1/4 w-1/2 h-1/4 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-sm pointer-events-none" />
                    
                    <div className={`mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {niche.icon}
                    </div>
                    <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest leading-tight px-6 ${isDarkMode ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-500 group-hover:text-black'}`}>
                      {niche.label}
                    </div>
                    
                    {/* 3D Depth Ring */}
                    <div className={`absolute inset-0 rounded-full border border-white/5 pointer-events-none`} style={{ transform: 'translateZ(-15px)' }} />
                  </motion.div>
                </MagneticBall>
              </div>
            ))}
          </div>

          <motion.p {...fadeIn} className={`mt-16 text-center max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Our influencers create authentic content that connects brands with real audiences across the globe.
          </motion.p>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section id="creators" className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeIn} className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Featured Creators</motion.h2>
            <motion.h3 {...fadeIn} className="text-4xl md:text-5xl font-bold">Top Talent in Our Network</motion.h3>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Spreading Gyan",
                image: "https://i.ibb.co.com/HDFQPkXF/Screenshot-2026-03-16-13-05-28-341-com-google-android-googlequicksearchbox-edit-jpg.jpg",
                link: "https://www.youtube.com/@SpreadingGyanOfficial",
                stats: [
                  { label: "Platform", value: "YouTube" },
                  { label: "Followers", value: "1.2M" },
                  { label: "Engagement", value: "8.4%" },
                  { label: "Niche", value: "Tech & Lifestyle" },
                  { label: "Location", value: "Mumbai, India" },
                  { label: "Recent Collab", value: "Samsung" }
                ]
              },
              {
                name: "Assassins Army",
                image: "https://i.ibb.co.com/BKr7RS6j/Screenshot-2026-03-16-13-04-13-604-com-google-android-googlequicksearchbox-edit-jpg.jpg",
                link: "https://www.youtube.com/@AssassinsARMY/videos",
                stats: [
                  { label: "Platform", value: "Instagram" },
                  { label: "Followers", value: "850K" },
                  { label: "Engagement", value: "12.1%" },
                  { label: "Niche", value: "Fitness & Health" },
                  { label: "Location", value: "Delhi, India" },
                  { label: "Recent Collab", value: "Nike" }
                ]
              },
              {
                name: "Lokesh Gamer",
                image: "https://i.ibb.co.com/Xrq3Nb29/4dc824e812aa31d5ea0894bae6eb61aa-jpg.jpg",
                link: "https://www.youtube.com/@LOKESHGAMER",
                stats: [
                  { label: "Platform", value: "TikTok" },
                  { label: "Followers", value: "2.5M" },
                  { label: "Engagement", value: "15.8%" },
                  { label: "Niche", value: "Beauty & Fashion" },
                  { label: "Location", value: "Bangalore, India" },
                  { label: "Recent Collab", value: "L'Oréal" }
                ]
              },
              {
                name: "Manoj Dey",
                image: "https://i.ibb.co.com/HD6165Ym/Screenshot-2026-03-16-13-04-53-507-com-google-android-googlequicksearchbox-edit-jpg.jpg",
                link: "https://www.youtube.com/@ManojDey",
                stats: [
                  { label: "Platform", value: "TikTok" },
                  { label: "Followers", value: "3.2M" },
                  { label: "Engagement", value: "18.4%" },
                  { label: "Niche", value: "Food & Cooking" },
                  { label: "Location", value: "Seoul, Korea" },
                  { label: "Recent Collab", value: "HelloFresh" }
                ]
              },
              {
                name: "SK SABIR GAMING",
                image: "https://i.ibb.co.com/C3tG7M9c/Screenshot-2026-03-16-13-06-35-906-com-google-android-googlequicksearchbox-edit-jpg.jpg",
                link: "https://www.youtube.com/@sksabir-gaming",
                stats: [
                  { label: "Platform", value: "YouTube" },
                  { label: "Followers", value: "1.8M" },
                  { label: "Engagement", value: "6.8%" },
                  { label: "Niche", value: "Gaming & Esports" },
                  { label: "Location", value: "London, UK" },
                  { label: "Recent Collab", value: "Razer" }
                ]
              }
            ].map((creator, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className={`rounded-[2.5rem] overflow-hidden group flex flex-col transition-all ${isDarkMode ? 'glass-card' : 'bg-zinc-50 border border-black/5 shadow-sm'}`}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={creator.image} 
                    alt={creator.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-1">{creator.name}</h4>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{creator.link.replace('https://', '')}</p>
                  </div>
                  <button 
                    onClick={() => window.open(creator.link, '_blank')}
                    className={`w-full mt-auto py-3 rounded-xl border text-sm font-bold transition-all ${isDarkMode ? 'glass border-white/10 hover:bg-white hover:text-black' : 'bg-white border-black/10 hover:bg-black hover:text-white'}`}
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Collaborations Section */}
      <section id="collaborations" className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeIn} className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Brand Collaborations</motion.h2>
            <motion.h3 {...fadeIn} className="text-4xl md:text-5xl font-bold mb-6">RA Media Influencer Marketing</motion.h3>
            <motion.p {...fadeIn} className={`max-w-3xl mx-auto text-lg ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              RA Media Influencer Marketing is proud to have successfully collaborated with multiple leading brands across industries, delivering impactful campaigns and measurable results.
            </motion.p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {[
              { name: "Vivo", desc: "Smartphone promotions and influencer campaigns", icon: <img src="https://i.ibb.co.com/ZPFxrQM/image.png" alt="Vivo" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" /> },
              { name: "Samsung", desc: "Product awareness and digital branding", icon: <img src="https://i.ibb.co.com/ynQy0Cg0/image.png" alt="Samsung" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" /> },
              { name: "Bachat App", desc: "User acquisition and engagement campaigns", icon: <img src="https://i.ibb.co.com/Y7Jqvxv8/image.png" alt="Bachat App" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" /> },
              { name: "Astrotalk App", desc: "Influencer-driven installs and reach growth", icon: <img src="https://i.ibb.co.com/7NJk3Ws7/image.png" alt="Astrotalk App" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" /> },
              { name: "CV Maker", desc: "Career-focused audience targeting campaigns", icon: <img src="https://i.ibb.co.com/wrrnJ10h/image.png" alt="CV Maker" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" /> },
              { name: "Trading Apps", desc: "Financial awareness and lead generation campaigns", icon: <img src="https://i.ibb.co.com/nszjWSWQ/image.png" alt="Trading Apps" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" /> }
            ].map((brand, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className={`p-8 rounded-[2.5rem] transition-all flex flex-col items-center text-center ${isDarkMode ? 'glass-card' : 'bg-zinc-50 border border-black/5 shadow-sm'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  {brand.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3">{brand.name}</h4>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{brand.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="space-y-8">
              <div>
                <h4 className="text-3xl font-bold mb-6">Our Approach</h4>
                <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Our approach combines strategic influencer partnerships, targeted audience reach, and creative content execution to ensure every brand achieves maximum visibility and ROI.
                </p>
                <p className={`text-lg leading-relaxed mt-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  At RA Media, we specialize in connecting brands with the right influencers to create authentic, engaging, and result-driven marketing campaigns.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-bold mb-4">Why Choose RA Media?</h4>
                {[
                  "Strong network of Nano to Macro Influencers",
                  "High-converting campaign strategies",
                  "End-to-end campaign management",
                  "Proven track record with multiple brands"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className={`font-medium ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className={`p-10 rounded-[3rem] text-center ${isDarkMode ? 'glass-card' : 'bg-zinc-50 border border-black/5 shadow-sm'}`}
            >
              <h4 className="text-3xl font-bold mb-6">Let’s Grow Together</h4>
              <p className={`text-lg mb-10 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                If you're looking to scale your brand through influencer marketing, RA Media is your trusted partner for success.
              </p>
              <button 
                onClick={() => setShowOrderForm(true)}
                className={`px-10 py-5 font-bold rounded-full transition-all flex items-center justify-center gap-2 mx-auto group ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5' : 'bg-black text-white hover:bg-zinc-800 shadow-lg shadow-black/5'}`}
              >
                Start Your Campaign
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-6 relative transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950/50' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 {...fadeIn} className={`text-sm font-bold uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Contact RA Media</motion.h2>
            <motion.h3 {...fadeIn} className="text-4xl md:text-5xl font-bold mb-6">Ready to grow your brand?</motion.h3>
            <motion.p {...fadeIn} className={`text-lg ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Get in touch with us to start your next campaign.</motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-100px" }}
                className="grid sm:grid-cols-2 gap-6"
              >
                <motion.div variants={fadeIn} className={`p-8 rounded-3xl flex flex-col items-center text-center ${isDarkMode ? 'glass-card' : 'bg-white border border-black/5 shadow-sm'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">Email</h4>
                  <a href="mailto:ramedia.marketing.in@gmail.com" className={`transition-colors break-all text-sm ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}>
                    ramedia.marketing.in@gmail.com
                  </a>
                </motion.div>

                <motion.div variants={fadeIn} className={`p-8 rounded-3xl flex flex-col items-center text-center ${isDarkMode ? 'glass-card' : 'bg-white border border-black/5 shadow-sm'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <GlobeIcon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">Website</h4>
                  <a href="https://www.ramediaglobal.com" target="_blank" rel="noopener noreferrer" className={`transition-colors text-sm ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}>
                    www.ramediaglobal.com
                  </a>
                </motion.div>

                <motion.div variants={fadeIn} className={`p-8 rounded-3xl flex flex-col items-center text-center ${isDarkMode ? 'glass-card' : 'bg-white border border-black/5 shadow-sm'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">Location</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>India | Global Campaigns</p>
                </motion.div>

                <motion.a 
                  variants={fadeIn} 
                  href="https://www.instagram.com/ramediaglobal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-8 rounded-3xl flex flex-col items-center text-center transition-colors cursor-pointer group ${isDarkMode ? 'glass-card hover:bg-white/5' : 'bg-white border border-black/5 shadow-sm hover:bg-zinc-50'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                    <Instagram className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-2">Instagram</h4>
                  <span className={`transition-colors text-sm ${isDarkMode ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-600 group-hover:text-black'}`}>
                    @ramediaglobal
                  </span>
                </motion.a>
              </motion.div>

              <motion.div {...fadeIn} className={`p-8 rounded-3xl ${isDarkMode ? 'glass-card' : 'bg-white border border-black/5 shadow-sm'}`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <Share2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold mb-6 text-xl">Phone / WhatsApp</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {[
                      "+91 9289796129",
                      "+91 9220533905",
                      "+91 6201014858",
                      "+91 82793 73543",
                      "+91 90538 78973"
                    ].map((phone, i) => (
                      <a 
                        key={i} 
                        href={`https://wa.me/${phone.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-colors font-medium text-sm ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-zinc-300' : 'bg-black/5 hover:bg-black/10 text-zinc-700'}`}
                      >
                        <span>{phone}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div {...fadeIn} className={`p-8 md:p-10 rounded-[2.5rem] border shadow-2xl ${isDarkMode ? 'glass-card border-white/10' : 'bg-white border-black/5'}`}>
              <div className="mb-8">
                <h4 className="text-2xl font-bold mb-2">Place Your Order</h4>
                <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Fill in the details below to start your campaign.</p>
              </div>
              <OrderForm onSubmitSuccess={() => {}} isDarkMode={isDarkMode} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`py-24 px-6 transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={scaleIn}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className={`p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden ${isDarkMode ? 'glass' : 'bg-zinc-50 border border-black/5 shadow-sm'}`}
          >
            <div className={`absolute top-0 left-0 w-full h-full pointer-events-none ${isDarkMode ? 'bg-gradient-to-br from-white/5 to-transparent' : 'bg-gradient-to-br from-black/5 to-transparent'}`} />
            <h3 className="text-4xl md:text-6xl font-bold mb-8 relative z-10">
              🚀 Let's Grow Your <br /> Brand Together
            </h3>
            <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Whether you're a startup, brand, or influencer, RA Media helps you create powerful collaborations that reach the right audience.
            </p>
            <button 
              onClick={() => setShowOrderForm(true)}
              className={`px-12 py-6 font-bold rounded-full transition-all relative z-10 text-lg ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_50px_rgba(255,255,255,0.1)]' : 'bg-black text-white hover:bg-zinc-800 shadow-xl'}`}
            >
              Start Your Influencer Campaign Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 px-6 border-t transition-colors duration-500 ${isDarkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="text-2xl font-bold tracking-tighter mb-6">RA MEDIA</div>
              <p className={`max-w-sm leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Connecting brands with powerful creators to build impactful collaborations that drive real results.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6">Quick Links</h5>
              <motion.ul 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className={`space-y-4 text-sm ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}
              >
                <motion.li variants={fadeIn}><a href="#" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Home</a></motion.li>
                <motion.li variants={fadeIn}><a href="#about" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>About Us</a></motion.li>
                <motion.li variants={fadeIn}><a href="#services" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>Services</a></motion.li>
                <motion.li variants={fadeIn}><a href="#influencers" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>For Influencers</a></motion.li>
              </motion.ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Follow Us</h5>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/ramediaglobal/" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'glass hover:bg-white hover:text-black' : 'bg-black/5 hover:bg-black hover:text-white'}`}>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/rahul-ramedia" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'glass hover:bg-white hover:text-black' : 'bg-black/5 hover:bg-black hover:text-white'}`}>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://t.me/RAMediaGlobal" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'glass hover:bg-white hover:text-black' : 'bg-black/5 hover:bg-black hover:text-white'}`}>
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className={`pt-8 border-t text-center text-xs ${isDarkMode ? 'border-white/5 text-zinc-600' : 'border-black/5 text-zinc-400'}`}>
            © {new Date().getFullYear()} RA MEDIA. All rights reserved.
          </div>
        </div>
      </footer>
      </motion.div>
    </>
  );
}
