import Link from "next/link";
import * as prismicH from "@prismicio/helpers";
import Picture from "@components/Picture";
import styles from "./locationPreview.module.scss";

export default function LocationPreview({ slug, data }) {
  const options = { weekday: "long", month: "long", day: "numeric" };
  return (
    <div className={styles.location}>
      <Link href={`/tournament/${slug}`} scroll={false}>
        <a>
          <Picture image={data.image} />
          <div className={styles.content}>
            <h3>{data.title}</h3>
            <p>
              {prismicH.asDate(data.startDateTime).toLocaleString(undefined, options)} -{" "}
              {prismicH.asDate(data.endDateTime).toLocaleString(undefined, options)}{" "}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}
