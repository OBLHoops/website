import { motion } from "framer-motion";
import styles from "./overlay.module.css";
export default function Overlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0
      }}
      transition={{ duration: 0.85, delay: 0, ease: "easeInOut" }}
      className={styles.overlay}
    ></motion.div>
  );
}
