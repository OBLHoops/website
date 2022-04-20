import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { v4 as uuidv4 } from "uuid";
import ContentContainer from "@components/ContentContainer";
import styles from "./partners.module.scss";

const Partners = ({ slice }) => {
  console.log(slice);
  const { primary, items } = slice;
  return (
    <section className={styles.partners}>
      <ContentContainer>
        <PrismicRichText field={primary?.title} />
        <PrismicRichText field={primary?.description} />
        {items.length && (
          <div className={styles.grid}>
            {items.map((item) => (
              <img src={item.logo.url} alt={item.logo.alt} key={uuidv4()} />
            ))}
          </div>
        )}
      </ContentContainer>
    </section>
  );
};

export default Partners;
