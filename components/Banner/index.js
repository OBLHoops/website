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
            className={styles.bannerLink}
          >
            <span>{bannerData.data.text} </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrow}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </PrismicLink>
        </div>
      </div>
    );
  }

  return null;
}
