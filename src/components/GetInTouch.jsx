import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";
import { FiMail, FiSend } from "react-icons/fi";
import { RiWhatsappFill } from "react-icons/ri";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sendStatus, setSendStatus] = useState("idle"); // "idle" | "loading" | "success"

  const socialLinks = [
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/srinath-g-dev",
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/Srinath176",
    },
    {
      icon: <FaTelegram className="w-5 h-5" />,
      label: "Telegram",
      href: "https://t.me/srinathg_dev",
    },
    {
      icon: <RiWhatsappFill className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/919573935893",
    },
  ];

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    if (message.length < 10) return false;
    return true;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    setSendStatus("loading");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICEID,
        import.meta.env.VITE_EMAILJS_TEMPLATEID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLICKEY
      )
      .then(() => {
        toast.success("Message sent!");
        setFormData({ name: "", email: "", message: "" });
        setSendStatus("success");

        // Reset after short delay
        setTimeout(() => {
          setSendStatus("idle");
        }, 1500);
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
        setSendStatus("idle");
      });
  };

  return (
    <section className="w-full px-4 py-20 ">
      <Toaster position="bottom-right" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[var(--color-accent)]">
            Work With Me
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Have a question, Job or collaboration in mind? Let's connect.
          </p>
          <motion.a
            initial={{opacity:0, y:-10}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.6}}
            viewport={{once:true}}
            href="mailto:srinathsri176@gmail.com"
            className="flex items-center gap-4 text-[var(--color-text)] hover:text-[var(--color-accent)] transition ml-2"
          >
            <FiMail className="w-5 h-5 text-[var(--color-accent)] hover:scale-105 hover:text-[var(--color-accent-hover)]" />
            srinathsri176@gmail.com
          </motion.a>
          <div className="flex gap-4 flex-wrap mt-6">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--color-card-bg)] border border-zinc-200 p-3 rounded-full shadow hover:bg-zinc-100 transition"
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.form
          className="card rounded-xl p-8 shadow-lg space-y-6 border border-zinc-200"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <label className="block text-sm text-[var(--color-text)] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Elon Musk"
              className="w-full border text-[var(--color-text)] border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text)] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="tech@example.com"
              className="w-full border text-[var(--color-text)] border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text)] mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="message length alteast 10"
              className="w-full border text-[var(--color-text)] border-zinc-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={sendStatus === "loading"}
            className={`flex items-center justify-center gap-2 px-6 py-2 ${
              sendStatus === "success"
                ? "bg-green-500"
                : "bg-[var(--color-accent)]"
            } text-[var(--color-button-text)] rounded-md hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50 w-40 cursor-pointer`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {sendStatus === "loading" && (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm"
                >
                  Sending...
                </motion.span>
              )}

              {sendStatus === "success" && (
                <motion.span
                  key="success"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-white text-sm"
                >
                  ✓ Sent
                </motion.span>
              )}

              {sendStatus === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-2"
                >
                  <FiSend className="w-4 h-4" /> Submit
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.form>
      </div>
    </section>
  );
}
