import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { SliceZone } from "@prismicio/react";
import { components } from "@slices/index";
import ContentContainer from "@components/ContentContainer";
import Link from "next/link";
import Picture from "@components/Picture";
import { getLayout } from "@components/Layout/PageLayout";
import { newsGraphQuery } from "@queries/index";
import styles from "@styles/News.module.scss";

export default function News({ pageData, defaultMetaData }) {
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
      </div>
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("news", "news", {
    graphQuery: newsGraphQuery
  });
  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");

  return {
    props: { pageData, navData, footerData, bannerData, defaultMetaData },
    revalidate: 10
  };
}

News.getLayout = getLayout;
