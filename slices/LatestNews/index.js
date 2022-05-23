import { useEffect } from "react";
import { createClient } from "@root/prismicio";
import { usePrismicDocumentsByType } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import NewsPostPreview from "@components/NewsPostPreview";
import { useSharedState } from "@lib/useSharedState";
import { classNames } from "@lib/utilities";
import styles from "./latestNews.module.scss";
const client = createClient();

const LatestNews = ({ slice }) => {
  const [documents] = usePrismicDocumentsByType("news-post", {
    client: client,
    orderings: {
      field: "my.news-post.postDate",
      direction: "desc"
    },
    pageSize: 3,
    page: 1
  });

  const [postsData, setPostsData] = useSharedState("postsData", documents);

  useEffect(() => {
    documents?.results && setPostsData(documents);
  }, [documents, setPostsData]);

  return (
    <section className={styles.latestNews}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            {slice.primary?.label && <h2>{slice.primary.label}</h2>}
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div>
            <Link href="/news">
              <a className={classNames([styles.button, styles.fill])}>
                {slice.primary.callToAction ? slice.primary.callToAction : "View all"}
              </a>
            </Link>
          </div>
        </div>

        {postsData?.results && (
          <div className={styles.grid}>
            {postsData.results.map((item) => (
              <NewsPostPreview {...item} slug={item.uid} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestNews;
