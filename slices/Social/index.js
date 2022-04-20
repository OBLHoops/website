import React from "react";
import { v4 as uuidv4 } from "uuid";
import ContentContainer from "@components/ContentContainer";
import { classNames } from "@lib/utilities";
import { PrismicLink } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import LocationPreview from "@components/LocationPreview";
import Picture from "@components/Picture";
import styles from "./social.module.scss";

const Social = ({ slice }) => {
  const { data } = slice?.primary?.socialContentLink;
  console.log(data);
  return (
    <section className={classNames([styles.social])}>
      <ContentContainer>
        <h2>{data.socialHandle}</h2>

        <ul className={styles.socialLinks}>
          {data?.socialLinks?.map(
            (item, index) => (
              console.log(item.platformIcon),
              (
                <li key={index}>
                  <PrismicLink
                    field={item.platformLink}
                    title={item.platformName}
                    className={styles.link}
                    target={item.platformLink.link_type == "Web" ? "_blank" : "_self"}
                  >
                    <img src={item.platformIcon.url} alt={item.platformName} />
                    <span>{item.platformName}</span>
                  </PrismicLink>
                </li>
              )
            )
          )}
        </ul>

        <div className={styles.images}>
          {data?.images?.map((item) => (
            <Picture image={item.image} key={uuidv4()} />
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};

export default Social;
