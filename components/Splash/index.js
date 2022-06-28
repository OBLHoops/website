import { motion } from "framer-motion";

export default function Splash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0
      }}
      transition={{ duration: 0.85, delay: 0.25, ease: "easeInOut" }}
      style={{
        zIndex: 5000,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#000",
        opacity: 1
      }}
    ></motion.div>
  );
}
