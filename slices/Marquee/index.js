import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FastMarquee from "react-fast-marquee";
import { classNames } from "@lib/utilities";
import { v4 as uuidv4 } from "uuid";
import styles from "./marquee.module.scss";

const Marquee = ({ slice }) => {
  const [isPaused, setIsPaused] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const Items = ({ data }) => {
    let itemsArray = data;
    // If there is only one item in the array create a second for the even/odd styles
    if (data.length === 1) {
      itemsArray = data.reduce((res, current) => [...res, current, current], []);
    }
    return (
      <>
        {itemsArray.map((item, index) => (
          <div
            className={classNames([styles.item, index % 2 === 1 ? styles.even : styles.odd])}
            key={uuidv4()}
          >
            <span className={styles.text}>{item.item}</span>
          </div>
        ))}
      </>
    );
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleKeyDown = (e) => {
    const { key, keyCode } = e;
    if (keyCode === 13 || keyCode === 32) {
      e.preventDefault();
      togglePause();
    }
  };

  return (
    <section
      className={classNames([styles.marquee, styles[`theme-${slice.primary.theme}`]])}
      onClick={togglePause}
      onKeyDown={handleKeyDown}
      aria-hidden="true"
      ref={ref}
      tabIndex="0"
      role="button"
    >
      <div className={styles.blocker} tabIndex="-1"></div>
      <FastMarquee play={!isPaused} speed="80" gradient={false}>
        {/* create 10x of the items so there's enough to fill the space */}
        {[...Array(10)].map(() => (
          <Items key={uuidv4()} data={[...slice.primary.marquee.data.items]} />
        ))}
      </FastMarquee>
    </section>
  );
};

export default Marquee;
