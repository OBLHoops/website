import { useEffect } from "react";
import { PrismicLink } from "@prismicio/react";
import { useMeasure } from "react-use";
import { useBannerSizeContext } from "@contexts/bannerSize";
import styles from "./banner.module.scss";

export default function Banner({ bannerData }) {
  const [ref, { width, height }] = useMeasure();
  const [bannerSize, setBannerSize] = useBannerSizeContext();
  useEffect(() => {
    setBannerSize({ width: width, height: height });
  }, [width, height]);
  if (bannerData?.data && bannerData?.data.active) {
    return (
      <div className={styles.banner} ref={ref}>
        <div className={styles.container}>
          <PrismicLink
            field={bannerData?.data.link}
            target={bannerData?.data.link.link_type == "Web" ? "_blank" : "_self"}
          >
            <p>
              {bannerData.data.text} {height}
            </p>
          </PrismicLink>
        </div>
      </div>
    );
  }

  return null;
}
