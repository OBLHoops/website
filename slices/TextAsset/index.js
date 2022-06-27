import { PrismicRichText } from "@prismicio/react";
import ContentContainer from "@components/ContentContainer";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import styles from "./textAsset.module.scss";

const TextAsset = ({ slice }) => {
  const variation = slice.variation;
  const { image, imagePosition, text, label, title, theme } = slice.primary;
  const imageProps = {
    ...(!image?.alt && { "aria-hidden": "true" })
  };
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
          <div
            className={classNames([
              styles.grid,
              imagePosition && styles[`align-image-${imagePosition}`]
            ])}
          >
            <div>{text && <PrismicRichText field={text} />}</div>
            {image && (
              <div {...imageProps}>
                <Picture image={image} />
              </div>
            )}
          </div>
        </>
      </ContentContainer>
    </section>
  );
};

export default TextAsset;
