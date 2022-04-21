import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { SliceZone } from "@prismicio/react";
import { components } from "@slices/index";
import { getLayout } from "@components/Layout/PageLayout";
import { pageGraphQuery } from "@queries/index";

export default function Tournament({ pageData, defaultMetaData }) {
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

export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("page", "tournament", {
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

Tournament.getLayout = getLayout;
