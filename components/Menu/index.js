import { useEffect } from "react";
import { PrismicLink } from "@prismicio/react";
import { motion, useReducedMotion } from "framer-motion";
import { useWindowScroll } from "react-use";
import { useBannerSizeContext } from "@contexts/bannerSize";
import { classNames } from "@lib/utilities";
import { ExternalLink } from "@components/Icon";
import styles from "./menu.module.scss";

export default function Menu({ toggle, navData }) {
  const shouldReduceMotion = useReducedMotion();
  const { y } = useWindowScroll();
  const [bannerSize] = useBannerSizeContext();
  const navVariant = {
    open: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { ease: "", duration: 0 }
        : { ease: "easeOut", duration: 0.15 }
    },
    closed: {
      opacity: 0,
      transition: shouldReduceMotion
        ? { ease: "", duration: 0.15 }
        : { ease: "easeOut", duration: 0.15, delay: 0.5 }
    }
  };

  const listVariant = {
    open: {
      transition: shouldReduceMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.15 }
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
          x: "0%",
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
          x: "-40%",
          opacity: 0,
          transition: {
            y: { stiffness: 1000 }
          }
        }
  };

  const menuOffset = -(y - bannerSize.height) > 0 ? -(y - bannerSize.height) : 0;
  return (
    <motion.nav
      className={classNames([styles.menu])}
      variants={navVariant}
      initial="closed"
      animate="open"
      exit="closed"
      style={{ top: 80 + menuOffset }}
    >
      <motion.div className={styles.container} variants={listVariant}>
        <ul className={classNames([styles.items])}>
          {navData.data.links.map((item, index) => (
            <motion.li variants={itemVariant} key={index}>
              <PrismicLink
                field={item.link}
                className={styles.link}
                activeclass={styles.active}
                onClick={() => toggle(false)}
                onKeyPress={() => toggle(false)}
                target={item.link.link_type == "Web" ? "_blank" : "_self"}
              >
                <span>
                  {item.label}
                  {item.link.link_type == "Web" && <ExternalLink className={styles.externalLink} />}
                </span>
              </PrismicLink>
            </motion.li>
          ))}
        </ul>
        <motion.div variants={itemVariant}>
          <PrismicLink
            field={navData.data.buttonLink}
            className={classNames([styles.button, styles.fill])}
            onClick={() => toggle(false)}
            onKeyPress={() => toggle(false)}
            target={navData.data.buttonLink.link_type == "Web" ? "_blank" : "_self"}
          >
            {navData.data.buttonLabel}
            {navData.data.buttonLink.link_type == "Web" && (
              <ExternalLink className={styles.externalLink} />
            )}
          </PrismicLink>
        </motion.div>
        <div className={styles.menuSpacer}></div>
      </motion.div>
    </motion.nav>
  );
}
