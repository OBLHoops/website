import { PrismicRichText } from "@prismicio/react";
import ContentContainer from "@components/ContentContainer";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import styles from "./textAsset.module.scss";

const TextAsset = ({ slice }) => {
  const { image, imagePosition, imageOverlap, text, label, title, theme } = slice.primary;
  return (
    <section className={classNames([styles.textAsset, styles[`theme-${theme}`]])}>
      <ContentContainer>
        <div className={styles.grid}>
          <div>{text && <PrismicRichText field={text} />}</div>
          <div>{image && <Picture image={image} />}</div>
        </div>
      </ContentContainer>
    </section>
  );
};

export default TextAsset;
