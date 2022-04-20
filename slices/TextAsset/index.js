import { PrismicRichText } from "@prismicio/react";
import ContentContainer from "@components/ContentContainer";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import styles from "./textAsset.module.scss";

const TextAsset = ({ slice }) => {
  console.log("slice.primary: ", slice.primary);

  const { image, imagePosition, imageOverlap, text, label, title, theme } = slice.primary;
  return (
    <section className={classNames([styles.textAsset, styles[`theme-${theme}`]])}>
      <ContentContainer>
        {text && <PrismicRichText field={text} />}
        {image && <Picture image={image} />}
      </ContentContainer>
    </section>
  );
};

export default TextAsset;
