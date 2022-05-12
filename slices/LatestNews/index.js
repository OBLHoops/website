import { createClient } from "@root/prismicio";
import { usePrismicDocumentsByType } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { classNames } from "@lib/utilities";
import styles from "./latestNews.module.scss";

const NewsPostPreview = dynamic(() => import("@components/NewsPostPreview"), { ssr: false });

const client = createClient();

const LatestNews = ({ slice }) => {
  const [documents, { state, error }] = usePrismicDocumentsByType("news-post", {
    client: client,
    orderings: {
      field: "my.news-post.postDate",
      direction: "desc"
    },
    pageSize: 3,
    page: 1
  });
  if (documents?.results) {
    return (
      <section className={styles.latestNews}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <div>
              <h2>{slice.primary.label}</h2>
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

          <div className={styles.grid}>
            {documents.results.map((item) => (
              <NewsPostPreview {...item} slug={item.uid} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default LatestNews;
