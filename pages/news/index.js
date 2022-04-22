import { createClient } from "@root/prismicio";
import { usePrismicDocumentsByType } from "@prismicio/react";
import CustomHead from "@components/Head";
import Link from "next/link";
import Picture from "@components/Picture";
import { classNames } from "@lib/utilities";
import NewsPostPreview from "@components/NewsPostPreview";
import { getLayout } from "@components/Layout/PageLayout";
import { newsGraphQuery } from "@queries/index";
import styles from "@styles/News.module.scss";
import { useEffect, useState } from "react";
const client = createClient();

export default function News({ pageData, newsPosts, defaultMetaData }) {
  const [postResults, setPostResults] = useState([...newsPosts.results]);
  const [postsPage, setPostPage] = useState(2);
  const [totalPostPages, setTotalPostPages] = useState(null);
  const [paginationActive, setPaginationActive] = useState(true);

  const [documents, { state, error }] = usePrismicDocumentsByType("news-post", {
    client: client,
    orderings: {
      field: "my.news-post.postDate",
      direction: "desc"
    },
    pageSize: 1,
    page: postsPage
  });

  useEffect(() => {
    documents?.results && setPostResults([...postResults, ...documents.results]);
    setTotalPostPages(documents?.total_results_size);
  }, [documents]);

  useEffect(() => {
    totalPostPages > 0 && postsPage >= totalPostPages && setPaginationActive(false);
  }, [postsPage, totalPostPages]);

  const handlePagination = () => {
    if (postsPage <= totalPostPages) {
      setPostPage(postsPage + 1);
    }
  };

  return (
    <>
      <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
      <div className={styles.container}>
        <h1>{pageData.data.title}</h1>
        {pageData.data.pinnedNewsPost && (
          <div className={styles.pinnedPost}>
            <Link
              href={`/news/${pageData.data.pinnedNewsPost.uid}`}
              title={pageData.data.pinnedNewsPost.data.title}
              className={styles.link}
              scroll={false}
            >
              <a>
                <Picture image={pageData.data.pinnedNewsPost.data.coverImage} />
                <div>
                  <h2>{pageData.data.pinnedNewsPost.data.title}</h2>
                  <p>{pageData.data.pinnedNewsPost.data.source}</p>
                  <p>{pageData.data.pinnedNewsPost.data.postDate}</p>
                </div>
              </a>
            </Link>
          </div>
        )}
        {postResults?.length && (
          <>
            <div className={styles.newsPosts}>
              <div className={styles.grid}>
                {postResults.map((item) => (
                  <NewsPostPreview {...item} slug={item.uid} key={item.id} />
                ))}
              </div>
            </div>
            <button
              onClick={handlePagination}
              className={classNames([
                styles.button,
                styles.fill,
                !paginationActive && styles.disabled
              ])}
              disabled={!paginationActive}
            >
              show more
            </button>
          </>
        )}
      </div>
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("news", "news", {
    graphQuery: newsGraphQuery
  });
  const newsPosts = await client.getByType("news-post", {
    orderings: {
      field: "my.news-post.postDate",
      direction: "desc"
    },
    pageSize: 1,
    page: 1
  });
  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");
  return {
    props: { pageData, newsPosts, navData, footerData, bannerData, defaultMetaData },
    revalidate: 10
  };
}

News.getLayout = getLayout;
