import React from "react";
import { v4 as uuidv4 } from "uuid";
import { classNames } from "@lib/utilities";
import { PrismicLink } from "@prismicio/react";
import { useParallax } from "react-scroll-parallax";
import { useReducedMotion } from "framer-motion";
import Picture from "@components/Picture";
import styles from "./social.module.scss";

const Social = ({ slice }) => {
  const { data } = slice?.primary?.socialContentLink;

  const ParallaxImage = ({ data, index }) => {
    const shouldReduceMotion = useReducedMotion();
    const translateY = ["-15%", "15%"];

    const { ref } = useParallax({
      disabled: shouldReduceMotion,
      translateY: index % 2 === 0 ? translateY.reverse() : translateY
    });
    return (
      <div className={styles.image}>
        <div ref={ref}>
          <Picture image={data.image} />
        </div>
      </div>
    );
  };

  return (
    <section className={classNames([styles.social])}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>{data.socialHandle}</h2>

          <ul className={styles.socialLinks}>
            {data?.socialLinks?.map((item, index) => (
              <li key={index}>
                <PrismicLink
                  field={item.platformLink}
                  className={styles.link}
                  target={item.platformLink.link_type == "Web" ? "_blank" : "_self"}
                >
                  <img src={item.platformIcon.url} alt="" />
                  <span>{item.platformName}</span>
                </PrismicLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.images} aria-hidden="true">
          {data?.images?.map((item, index) => {
            if (index < 7) {
              return <ParallaxImage data={item} key={uuidv4()} index={index} />;
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Social;
