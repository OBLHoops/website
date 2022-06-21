import { motion } from "framer-motion";
import styles from "./splash.module.scss";

export default function Splash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0
      }}
      transition={{ duration: 0.85, delay: 0.25, ease: "easeInOut" }}
      className={styles.splash}
    ></motion.div>
  );
}
