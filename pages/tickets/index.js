import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { PrismicRichText } from "@prismicio/react";
import { getLayout } from "@components/Layout/PageLayout";
import ContentContainer from "@components/ContentContainer";
import LocationPreview from "@components/LocationPreview";
import styles from "@styles/Tickets.module.scss";

export default function Tickets({ pageData, locationsData, defaultMetaData }) {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const upcomingEvents = locationsData.results.filter((item) => {
    const now = today.getTime();
    const endDateTime = new Date(item.data.endDateTime);
    return endDateTime > now && item.data.endDateTime;
  });

  console.log();

  if (pageData?.data) {
    return (
      <>
        <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />

        {upcomingEvents.length > 0 ? (
          <>
            <ContentContainer margin="top">
              <PrismicRichText field={pageData.data.title} />
            </ContentContainer>
            <div className={styles.schedule}>
              <ContentContainer>
                <div className={styles.grid}>
                  {upcomingEvents.map((item) => (
                    <LocationPreview {...item} slug={item.uid} key={item.id} />
                  ))}
                </div>
              </ContentContainer>
            </div>
          </>
        ) : (
          <>
            <ContentContainer margin="top">
              <h1>That's it for the season!</h1>
            </ContentContainer>
            <ContentContainer margin="bottom">
              <p>Check back with us for details on the 2023 tournaments.</p>
            </ContentContainer>
          </>
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
