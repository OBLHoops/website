import { createClient } from "@root/prismicio";
import Link from "next/link";
import CustomHead from "@components/Head";
import { getLayout } from "@components/Layout/PageLayout";
import { classNames } from "@lib/utilities";
import ContentContainer from "@components/ContentContainer";
import styles from "@styles/404.module.scss";

export default function Error({ defaultMetaData }) {
  return (
    <>
      <CustomHead defaultMetaData={defaultMetaData} />
      <div className={styles.error}>
        <ContentContainer>
          <h1 className="h2">Looks like you got a little lost.</h1>
          <Link href="/">
            <a className={classNames([styles.button, styles.fill])}>Return to homepage</a>
          </Link>
        </ContentContainer>
      </div>
    </>
  );
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  const navData = await client.getByUID("navigation", "navigation");
  const footerData = await client.getByUID("footer", "footer");
  const bannerData = await client.getByUID("banner", "banner");
  const defaultMetaData = await client.getByUID("metadata", "metadata");

  return {
    props: { navData, footerData, bannerData, defaultMetaData },
    revalidate: 10
  };
}

Error.getLayout = getLayout;
