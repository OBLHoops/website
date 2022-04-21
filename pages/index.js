import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { SliceZone } from "@prismicio/react";
import { components } from "@slices/index";
import { getLayout } from "@components/Layout/PageLayout";
import { homepageGraphQuery } from "@queries/index";

export default function Homepage({ pageData, defaultMetaData }) {
  return (
    <>
      <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
      <SliceZone slices={pageData.data.slices} components={components} />
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("homepage", "homepage", {
    graphQuery: homepageGraphQuery
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

Homepage.getLayout = getLayout;
