import Link from "next/link";
import Picture from "@components/Picture";
import styles from "./newsPostPreview.module.scss";

export default function NewsPostPreview({ slug, data }) {
  return (
    <div className={styles.preview}>
      <Link href={`/news/${slug}`} scroll={false}>
        <a>
          {/* todo add placeholder image */}
          <Picture image={data.coverImage} />
          {data.title && <h3>{data.title}</h3>}
          {data.postData && <p>{data.postData}</p>}
          {data.source && <p>{data.source}</p>}
        </a>
      </Link>
    </div>
  );
}
