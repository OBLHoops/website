import { useEffect, useState } from "react";
import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { SliceZone } from "@prismicio/react";
import { asDate } from "@prismicio/helpers";
import { components } from "@slices/index";
import { getLayout } from "@components/Layout/PageLayout";
import ContentContainer from "@components/ContentContainer";
import { pageGraphQuery } from "@queries/index";
import styles from "@styles/NewsPost.module.scss";

export default function NewsPost({ pageData, defaultMetaData }) {
  const [postDate, setPostDate] = useState(null);
  useEffect(() => {
    const options = { month: "long", day: "numeric" };
    setPostDate(asDate(pageData.data.postDate).toLocaleString(undefined, options));
  }, []);
  if (pageData?.data) {
    return (
      <>
        <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
        <div className={styles.intro}>
          <ContentContainer>
            <p className={styles.label}>{pageData.data.source}</p>
            <h1>{pageData.data.title}</h1>
            {postDate && <p className={styles.date}>{postDate}</p>}
          </ContentContainer>
        </div>
        <SliceZone slices={pageData.data.slices} components={components} />
      </>
    );
  }
  return null;
}

export async function getStaticPaths() {
  const client = createClient();
  const allPages = await client.getAllByType("news-post");

  // If a page has a template, e.g. a page called about.js,
  // add the name to the array
  const hasPageTemplate = [""];

  // Remove pages that have a template from static paths
  const filterOutTemplates = allPages?.filter((node) => !hasPageTemplate.includes(node.uid));

  // Create an array of paths to pass to static paths
  const allPaths = filterOutTemplates.map((node) => `/news/${node.uid}`);

  return {
    paths: allPaths || [],
    fallback: "blocking"
  };
}

export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("news-post", params.uid, {
    graphQuery: pageGraphQuery
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

NewsPost.getLayout = getLayout;
