import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { SliceZone } from "@prismicio/react";
import { components } from "@slices/index";
import { getLayout } from "@components/Layout/PageLayout";
import { pageGraphQuery } from "@queries/index";

export default function Page({ pageData, defaultMetaData }) {
  if (pageData?.data) {
    return (
      <>
        <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
        <SliceZone slices={pageData.data.slices} components={components} />
      </>
    );
  }
  return null;
}

export async function getStaticPaths() {
  const client = createClient();
  const allPages = await client.getAllByType("page");

  // If a page has a template, e.g. a page called about.js,
  // add the name to the array
  const hasPageTemplate = ["tournament"];

  // Remove pages that have a template from static paths
  const filterOutTemplates = allPages?.filter((node) => !hasPageTemplate.includes(node.uid));

  // Create an array of paths to pass to static paths
  const allPaths = filterOutTemplates.map((node) => `/${node.uid}`);

  return {
    paths: allPaths || [],
    fallback: false
  };
}

export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("page", params.uid, {
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

Page.getLayout = getLayout;
