import Picture from "@components/Picture";
import ContentContainer from "@components/ContentContainer";
import styles from "./image.module.scss";

const Image = ({ slice }) => {
  const { image } = slice.primary;
  if (image) {
    return (
      <section className={styles.image}>
        <ContentContainer>
          <Picture image={image} />
        </ContentContainer>
      </section>
    );
  }
  return null;
};

export default Image;
