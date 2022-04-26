import { PrismicLink } from "@prismicio/react";
import styles from "./banner.module.scss";

export default function Banner({ bannerData }) {
  if (bannerData?.data && bannerData?.data.active) {
    return (
      <div className={styles.banner}>
        <div className={styles.container}>
          <PrismicLink
            field={bannerData?.data.link}
            target={bannerData?.data.link.link_type == "Web" ? "_blank" : "_self"}
          >
            <p>{bannerData.data.text}</p>
          </PrismicLink>
        </div>
      </div>
    );
  }

  return null;
}
