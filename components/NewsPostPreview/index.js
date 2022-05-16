import { useEffect, useState } from "react";
import Link from "next/link";
import { asDate } from "@prismicio/helpers";
import Picture from "@components/Picture";
import styles from "./newsPostPreview.module.scss";

export default function NewsPostPreview({ slug, data }) {
  const [postDate, setPostDate] = useState(null);
  useEffect(() => {
    const options = { month: "long", day: "numeric" };
    setPostDate(asDate(data.postDate).toLocaleString(undefined, options));
  }, []);
  return (
    <div className={styles.preview}>
      <Link href={data.externalLink.link_type == "Web" ? data.externalLink.url : `/news/${slug}`}>
        <a target={data.externalLink.link_type == "Web" ? "_blank" : "_self"}>
          <div className={styles.image} aria-hidden="true">
            {data.coverImage.url && <Picture image={data.coverImage} />}
          </div>
          <div className={styles.content}>
            {data.source && <p className={styles.source}>{data.source}</p>}
            {data.title && <h3>{data.title}</h3>}
            {postDate && <p className={styles.date}>{postDate}</p>}
          </div>
        </a>
      </Link>
    </div>
  );
}
