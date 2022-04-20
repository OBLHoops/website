import Link from "next/link";
import Picture from "@components/Picture";
import styles from "./locationPreview.module.scss";

export default function LocationPreview({ slug, data }) {
  return (
    <div className={styles.location}>
      <Link href={`/tournament/${slug}`}>
        <a>
          <Picture image={data.image} />
          <h3>{data.title}</h3>
          <p>
            {data.startDateTime} - {data.endDateTime}
          </p>
        </a>
      </Link>
    </div>
  );
}
