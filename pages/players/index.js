import { createClient } from "@root/prismicio";
import CustomHead from "@components/Head";
import { PrismicRichText } from "@prismicio/react";
import ContentContainer from "@components/ContentContainer";
import { getLayout } from "@components/Layout/PageLayout";
import { playersGraphQuery } from "@queries/index";
import styles from "@styles/Players.module.scss";
import PlayerPreview from "@components/PlayerPreview";

export default function Players({ pageData, defaultMetaData }) {
  if (pageData?.data) {
    return (
      <>
        <CustomHead defaultMetaData={defaultMetaData} pageMetaData={pageData.data} />
        <ContentContainer margin="top">
          <PrismicRichText field={pageData.data.title} />
        </ContentContainer>
        {pageData.data?.players && (
          <ContentContainer margin="top">
            <div className={styles.grid}>
              {pageData.data.players.map((item, index) => (
                <PlayerPreview
                  key={item.player.slug}
                  slug={item.player.slug}
                  data={item.player.data}
                  rank={index}
                />
              ))}
            </div>
          </ContentContainer>
        )}
      </>
    );
  }
  return null;
}

export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });
  const pageData = await client.getByUID("players", "players", {
    graphQuery: playersGraphQuery
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

Players.getLayout = getLayout;
