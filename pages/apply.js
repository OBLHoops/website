import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { Widget } from "@typeform/embed-react";
import { getLayout } from "@components/Layout/FormLayout";

export default function Apply({ pageData, defaultMetaData }) {
  return (
    <>
      <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
      <Widget id="Ukjk6bap" style={{ width: "100%", height: "100vh" }} />
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("apply", "apply");
  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");

  return {
    props: { pageData, navData, footerData, bannerData, defaultMetaData },
    revalidate: 10
  };
}

Apply.getLayout = getLayout;
