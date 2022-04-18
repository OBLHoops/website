import Link from "next/link";
import ActiveLink from "@components/ActiveLink";
import { motion, useReducedMotion } from "framer-motion";
import { classNames } from "@lib/utilities";
import styles from "./menu.module.scss";

export default function Menu({ toggle, navData }) {
  const shouldReduceMotion = useReducedMotion();

  const navVariant = {
    open: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { ease: "", duration: 0 }
        : { ease: "easeOut", duration: 0.25 }
    },
    closed: {
      opacity: 0,
      transition: shouldReduceMotion
        ? { ease: "", duration: 0.15 }
        : { ease: "easeOut", duration: 0.15 }
    }
  };

  const listVariant = {
    open: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.25 }
    },
    closed: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, staggerDirection: 0 }
        : { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariant = {
    open: shouldReduceMotion
      ? {
          opacity: 1
        }
      : {
          y: 0,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 }
          }
        },
    closed: shouldReduceMotion
      ? {
          opacity: 0
        }
      : {
          y: 8,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 }
          }
        }
  };

  const socialListVariant = {
    open: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.75 }
    },
    closed: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, staggerDirection: 0 }
        : { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const socialVariant = {
    open: shouldReduceMotion
      ? {
          opacity: 1
        }
      : {
          scale: 1,
          opacity: 1,
          transition: {
            y: { stiffness: 1000, velocity: -100 }
          }
        },
    closed: shouldReduceMotion
      ? {
          opacity: 0
        }
      : {
          scale: 0,
          opacity: 0,
          transition: {
            y: { stiffness: 1000 }
          }
        }
  };

  return (
    <motion.nav
      className={classNames([styles.menu])}
      variants={navVariant}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <div className={styles.container}>
        menu
        {/* {navData.data.slices.map((nav, index) => (
          <motion.ul className={classNames([styles.items])} variants={listVariant} key={index}>
            {nav.items.map((item) => (
              <motion.li variants={itemVariant} key={item.link.uid}>
                <ActiveLink
                  href={`/${item.link.uid}`}
                  className={classNames([styles.link])}
                  activeClassName={styles.active}
                  onClick={() => toggle(false)}
                  onKeyPress={() => toggle(false)}
                >
                  <a
                    title={item.label}
                    className={classNames([styles.link, item.theme && styles[item.theme]])}
                    onClick={() => toggle(false)}
                    onKeyPress={() => toggle(false)}
                    role="link"
                    tabIndex="0"
                    target={item.link.link_type == "Web" ? "_blank" : "_self"}
                  >
                    {item.label}
                  </a>
                </ActiveLink>
              </motion.li>
            ))}
          </motion.ul> 
        ))}*/}
      </div>
    </motion.nav>
  );
}
