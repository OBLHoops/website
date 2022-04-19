import FastMarquee from "react-fast-marquee";
import { classNames } from "@lib/utilities";
import { v4 as uuidv4 } from "uuid";
import styles from "./marquee.module.scss";

const Marquee = ({ slice }) => {
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
  return (
    <section className={classNames([styles.marquee, styles[`theme-${slice.primary.theme}`]])}>
      <FastMarquee speed="80" gradient={false}>
        {/* create 10x of the items so there's enough to fill the space */}
        {[...Array(10)].map(() => (
          <Items key={uuidv4()} data={[...slice.primary.marquee.data.items]} />
        ))}
      </FastMarquee>
    </section>
  );
};

export default Marquee;
