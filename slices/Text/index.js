import { PrismicRichText } from "@prismicio/react";
import ContentContainer from "@components/ContentContainer";
import { classNames } from "@lib/utilities";
import styles from "./text.module.scss";

const Text = ({ slice }) => {
  const { primary } = slice;

  if (primary?.text.length) {
    return (
      <section
        className={classNames([
          styles.text,
          primary.align && styles[`align-${primary.align}`],
          primary.spacing && styles[`spacing-${primary.spacing}`]
        ])}
      >
        <ContentContainer>
          <div className={classNames([styles.wrapper])}>
            <PrismicRichText field={primary?.text} />
          </div>
        </ContentContainer>
      </section>
    );
  }
  return null;
};

export default Text;
