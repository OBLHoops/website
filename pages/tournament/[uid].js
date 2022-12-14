import { useEffect, useState } from "react";
import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { PrismicRichText } from "@prismicio/react";
import { asDate } from "@prismicio/helpers";
import { SliceZone } from "@prismicio/react";
import { components } from "@slices/index";
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  useEffect(() => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    setStartDate(asDate(pageData.data.startDateTime).toLocaleString(undefined, options));
    setEndDate(asDate(pageData.data.endDateTime).toLocaleString(undefined, options));
    setStartTime(
      asDate(pageData.data.startDateTime).toLocaleString(undefined, { timeStyle: "short" })
    );
  }, []);
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
        {pageData.data.showVenueDetails && (
          <div className={styles.location}>
            <ContentContainer>
              <div className={styles.title}>
                <h1>{pageData.data.title}</h1>
              </div>
              <div className={styles.grid}>
                <div className={styles.image}>
                  <Picture image={pageData.data.image} />
                </div>
                <div>
                  <p className={styles.label}>When</p>
                  <h2>
                    {startDate} - {endDate}
                  </h2>
                  <p className={styles.label}>Location</p>
                  <h3>{pageData.data.venue[0].name}</h3>
                  {pageData.data.venue[0].address[0].text.length > 0 && (
                    <a
                      target="_blank"
                      aria-describedby="new-window-2"
                      rel="noopener noreferrer"
                      href={` https://www.google.com/maps/search/?api=1&query=${pageData.data.venue[0].name}&query_place_id=${pageData.data.venue[0].placeId}`}
                      className={styles.textLink}
                    >
                      <PrismicRichText field={pageData.data.venue[0].address} />
                    </a>
                  )}
                  <PrismicRichText field={pageData.data.venue[0].description} />
                </div>
              </div>
            </ContentContainer>
          </div>
        )}
        <SliceZone slices={pageData.data.slices} components={components} />
        <Marquee slice={marqueeObj} />
        {locationsData?.results.length && (
          <div className={styles.schedule}>
            <ContentContainer>
              <h2>Schedule</h2>
              <div className={styles.grid}>
                {locationsData.results.map((item) => (
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
    fallback: "blocking"
  };
}

export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("location", params.uid);
  const marqueeData = await client.getByID("Yl7sHxcAAGfZF6rO");
  const locationsData = await client.getByType("location", {
    orderings: {
      field: "my.location.startDateTime",
      direction: "desc"
    }
  });
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
