import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  FaPaperPlane, FaPhone, FaEnvelope, 
  FaLinkedin, FaGithub, FaTelegram, FaWhatsapp, FaCheckCircle 
} from "react-icons/fa";

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useGSAP(() => {
    gsap.from(".contact-anim", {
      opacity: 0,
      x: -30,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".contact-anim",
        start: "top 85%",
      }
    });

    gsap.from(".form-anim", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".form-anim",
        start: "top 85%",
      }
    });
  }, { scope: sectionRef });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('https://formspree.io/f/mldpzjja', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        formRef.current.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen w-full bg-gray-50 dark:bg-black py-24 px-6 lg:px-20 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/5 dark:bg-white/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="contact-anim mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter uppercase italic">
            Get In <span className="text-gray-500 dark:text-gray-400">Touch</span>
          </h2>
          <div className="h-1 w-32 bg-gray-500 dark:bg-gray-400 mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-6">
            <p className="contact-anim text-gray-600 dark:text-gray-400 text-lg max-w-md font-light mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="contact-anim grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="group flex items-center gap-5 p-5 bg-black/5 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 rounded-2xl hover:border-gray-500 dark:hover:border-gray-500 transition-all">
                <div className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 text-lg">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Phone / WhatsApp</p>
                  <p className="text-black dark:text-white text-sm font-medium">+251 929 135 683</p>
                </div>
              </div>

              <div className="group flex items-center gap-5 p-5 bg-black/5 dark:bg-white/[0.02] border border-black/10 dark:border-white/5 rounded-2xl hover:border-gray-500 dark:hover:border-gray-500 transition-all">
                <div className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 text-lg">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Email</p>
                  <p className="text-black dark:text-white text-sm font-medium">eyobbegashaw6@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="contact-anim flex flex-wrap gap-4 pt-6">
              <a href="https://t.me/eyob_begashaw" target="_blank" rel="noreferrer" title="Telegram" className="w-12 h-12 border border-black/20 dark:border-white/20 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xl">
                <FaTelegram />
              </a>
              <a href="https://wa.me/251929135683" target="_blank" rel="noreferrer" title="WhatsApp" className="w-12 h-12 border border-black/20 dark:border-white/20 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xl">
                <FaWhatsapp />
              </a>
              <a href="https://linkedin.com/in/eyobbegashaw" target="_blank" rel="noreferrer" title="LinkedIn" className="w-12 h-12 border border-black/20 dark:border-white/20 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xl">
                <FaLinkedin />
              </a>
              <a href="https://github.com/eyobbegashaw" target="_blank" rel="noreferrer" title="GitHub" className="w-12 h-12 border border-black/20 dark:border-white/20 rounded-full flex items-center justify-center text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xl">
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="form-anim bg-gray-100 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input 
                    type="text" name="name" id="name" required 
                    className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-black dark:text-white outline-none focus:border-gray-500 transition-all placeholder-transparent" 
                    placeholder="Name" 
                  />
                  <label 
                    htmlFor="name"
                    className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-500 peer-focus:text-xs"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input 
                    type="email" name="email" id="email" required 
                    className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-black dark:text-white outline-none focus:border-gray-500 transition-all placeholder-transparent" 
                    placeholder="Email" 
                  />
                  <label 
                    htmlFor="email"
                    className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-500 peer-focus:text-xs"
                  >
                    Your Email
                  </label>
                </div>
              </div>

              <div className="relative">
                <input 
                  type="text" name="subject" id="subject" required 
                  className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-black dark:text-white outline-none focus:border-gray-500 transition-all placeholder-transparent" 
                  placeholder="Subject" 
                />
                <label 
                  htmlFor="subject"
                  className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-500 peer-focus:text-xs"
                >
                  Subject
                </label>
              </div>

              <div className="relative">
                <textarea 
                  name="message" id="message" required rows="4" 
                  className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-black dark:text-white outline-none focus:border-gray-500 transition-all placeholder-transparent resize-none" 
                  placeholder="Message"
                ></textarea>
                <label 
                  htmlFor="message"
                  className="absolute left-0 -top-4 text-gray-500 text-xs uppercase tracking-widest font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-500 peer-focus:text-xs"
                >
                  Your Message
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-700 dark:text-green-500 bg-green-100 dark:bg-green-500/10 p-3 rounded-lg">
                  <FaCheckCircle /> Message sent successfully!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-red-700 dark:text-red-500 bg-red-100 dark:bg-red-500/10 p-3 rounded-lg">
                  Failed to send message. Please try again.
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full group relative overflow-hidden bg-black dark:bg-white py-4 rounded-xl font-black text-white dark:text-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg shadow-black/20 dark:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'} 
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;