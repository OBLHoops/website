import Link from "next/link";
import { asDate } from "@prismicio/helpers";
import Picture from "@components/Picture";
import styles from "./newsPostPreview.module.scss";

export default function NewsPostPreview({ slug, data }) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return (
    <div className={styles.preview}>
      <Link href={data.externalLink.link_type == "Web" ? data.externalLink.url : `/news/${slug}`}>
        <a target={data.externalLink.link_type == "Web" ? "_blank" : "_self"}>
          <div className={styles.image}>
            {data.coverImage.url && <Picture image={data.coverImage} />}
          </div>
          <div className={styles.content}>
            {data.source && <p className={styles.source}>{data.source}</p>}
            {data.title && <h3>{data.title}</h3>}
            {data.postDate && (
              <p className={styles.date}>
                {asDate(data.postDate).toLocaleString(undefined, options)}
              </p>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
}
