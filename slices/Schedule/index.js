import React from "react";
import ContentContainer from "@components/ContentContainer";
import { classNames } from "@lib/utilities";
import { PrismicRichText } from "@prismicio/react";
import LocationPreview from "@components/LocationPreview";
import styles from "./schedule.module.scss";

const Schedule = ({ slice }) => {
  const { primary, items } = slice;
  return (
    <section className={classNames([styles.schedule])}>
      <ContentContainer>
        <PrismicRichText field={primary?.title} />
        <PrismicRichText field={primary?.description} />
        {items.length && (
          <div className={styles.grid}>
            {items.map((item) => (
              <LocationPreview {...item.location} key={item.location.id} />
            ))}
          </div>
        )}
      </ContentContainer>
    </section>
  );
};

export default Schedule;
