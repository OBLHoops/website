import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { PrismicRichText } from "@prismicio/react";
import { getLayout } from "@components/Layout/PageLayout";
import ContentContainer from "@components/ContentContainer";
import Marquee from "@slices/Marquee";
import Picture from "@components/Picture";
import LocationPreview from "@components/LocationPreview";
import styles from "@styles/Location.module.scss";

export default function Location({
  pageData,
  marqueeData = {},
  locationsData = {},
  defaultMetaData
}) {
  if (pageData?.data) {
    const marqueeObj = {
      primary: {
        theme: "yellow",
        marquee: { ...marqueeData }
      }
    };
    return (
      <>
        <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
        <div className={styles.location}>
          <ContentContainer>
            <h1>{pageData.data.title}</h1>
            <div className={styles.grid}>
              <div>
                <Picture image={pageData.data.image} />
              </div>
              <div>
                when
                <h2>
                  {pageData.data.startDateTime} - {pageData.data.endDateTime}
                </h2>
                <p>Starts @ {pageData.data.startDateTime}</p>
                location
                <h3>{pageData.data.venue[0].name}</h3>
                <a
                  target="_blank"
                  aria-describedby="new-window-2"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/place/?q=place_id:${pageData.data.venue[0].placeId}`}
                >
                  <PrismicRichText field={pageData.data.venue[0].address} />
                </a>
                <PrismicRichText field={pageData.data.venue[0].description} />
              </div>
            </div>
          </ContentContainer>
        </div>
        <Marquee slice={marqueeObj} />
        {locationsData.length && (
          <div className={styles.schedule}>
            <ContentContainer>
              <div className={styles.grid}>
                {locationsData.map((item) => (
                  <LocationPreview {...item} slug={item.uid} key={item.id} />
                ))}
              </div>
            </ContentContainer>
          </div>
        )}
      </>
    );
  }
  return null;
}

export async function getStaticPaths() {
  const client = createClient();
  const allPages = await client.getAllByType("location");

  // If a page has a template, e.g. a page called about.js,
  // add the name to the array
  const hasPageTemplate = [""];

  // Remove pages that have a template from static paths
  const filterOutTemplates = allPages?.filter((node) => !hasPageTemplate.includes(node.uid));

  // Create an array of paths to pass to static paths
  const allPaths = filterOutTemplates.map((node) => `/tournament/${node.uid}`);

  return {
    paths: allPaths || [],
    fallback: true
  };
}

export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("location", params.uid);
  const marqueeData = await client.getByID("Yl7sHxcAAGfZF6rO");
  const locationsData = await client.getAllByType("location");
  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");

  return {
    props: {
      pageData,
      marqueeData,
      locationsData,
      navData,
      footerData,
      bannerData,
      defaultMetaData
    },
    revalidate: 10
  };
}

Location.getLayout = getLayout;
