import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { PrismicRichText } from "@prismicio/react";
import { asDate } from "@prismicio/helpers";
import { getLayout } from "@components/Layout/PageLayout";
import ContentContainer from "@components/ContentContainer";
import Marquee from "@slices/Marquee";
import Picture from "@components/Picture";
import LocationPreview from "@components/LocationPreview";
import styles from "@styles/Tickets.module.scss";

export default function Tickets({
  pageData,
  marqueeData = {},
  locationsData = {},
  defaultMetaData
}) {
  const options = { weekday: "long", month: "long", day: "numeric" };
  const timeOptions = { timeStyle: "short" };
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
        <ContentContainer margin="top">
          <PrismicRichText field={pageData.data.title} />
        </ContentContainer>
        {locationsData?.results.length && (
          <div className={styles.schedule}>
            <ContentContainer>
              <div className={styles.grid}>
                {locationsData.results.map((item) => (
                  <LocationPreview {...item} slug={item.uid} key={item.id} />
                ))}
                <div className={styles.blank}></div>
              </div>
            </ContentContainer>
          </div>
        )}
      </>
    );
  }
  return null;
}

export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("tickets", "tickets");
  const locationsData = await client.getByType("location", {
    orderings: {
      field: "my.location.startDateTime",
      direction: "asc"
    }
  });
  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");

  return {
    props: {
      pageData,
      locationsData,
      navData,
      footerData,
      bannerData,
      defaultMetaData
    },
    revalidate: 10
  };
}

Tickets.getLayout = getLayout;
