import { useEffect, useState } from "react";
import Link from "next/link";
import { asDate } from "@prismicio/helpers";
import Picture from "@components/Picture";
import styles from "./locationPreview.module.scss";

export default function LocationPreview({ slug, data }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    setStartDate(asDate(data.startDateTime).toLocaleString(undefined, options));
    setEndDate(asDate(data.endDateTime).toLocaleString(undefined, options));
  }, []);
  return (
    <div className={styles.location}>
      <Link href={`/tournament/${slug}`} scroll={false}>
        <a>
          <div className={styles.image} aria-hidden="true">
            <Picture image={data.image} />
          </div>
          <div className={styles.content}>
            <h3>{data.title}</h3>
            <p>
              {startDate} - {endDate}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}
