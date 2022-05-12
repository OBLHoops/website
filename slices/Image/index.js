import Picture from "@components/Picture";
import ContentContainer from "@components/ContentContainer";
import styles from "./image.module.scss";

const Image = ({ slice }) => {
  const { image } = slice.primary;
  const imageProps = {
    ...(!image.alt && { "aria-hidden": "true" })
  };
  if (image) {
    return (
      <section className={styles.image} {...imageProps}>
        <ContentContainer>
          <Picture image={image} />
        </ContentContainer>
      </section>
    );
  }
  return null;
};

export default Image;
