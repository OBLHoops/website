import { PrismicRichText } from "@prismicio/react";
import ContentContainer from "@components/ContentContainer";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import styles from "./textAsset.module.scss";

const TextAsset = ({ slice }) => {
  const variation = slice.variation;
  const { image, imagePosition, imageOverlap, text, label, title, theme } = slice.primary;
  console.log(slice);
  return (
    <section className={classNames([styles.textAsset, styles[`theme-${theme}`]])}>
      <ContentContainer>
        <>
          {variation === "withIntroText" && (
            <div className={styles.intro}>
              <PrismicRichText field={label} />
              <PrismicRichText field={title} />
            </div>
          )}
          <div className={styles.grid}>
            <div>{text && <PrismicRichText field={text} />}</div>
            <div>{image && <Picture image={image} />}</div>
          </div>
        </>
      </ContentContainer>
    </section>
  );
};

export default TextAsset;
