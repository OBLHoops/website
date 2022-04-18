import Link from "next/link";
import styles from "./banner.module.scss";

export default function Banner({ bannerData }) {
  if (bannerData) {
    return (
      <div className={styles.banner}>
        <div className={styles.container}>
          <p>{bannerData.data.text}</p>
        </div>
      </div>
    );
  }

  return null;
}
