import { classNames } from "@lib/utilities";
import styles from "./text.module.scss";
import { PrismicRichText } from "@prismicio/react";
import ContentContainer from "@components/ContentContainer";

const Text = ({ slice }) => {
  const { primary } = slice;
  return (
    <section className={classNames([styles.text], primary.ui && styles[primary.uid])}>
      <ContentContainer>
        <div className={classNames([styles.wrapper])}>
          <PrismicRichText field={primary?.Text} />
        </div>
      </ContentContainer>
    </section>
  );
};

export default Text;
