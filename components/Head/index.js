import Head from "next/head";

const CustomHead = ({ defaultMetaData, pageMetaData }) => {
  const {
    metaTitle: globalMetaTitle,
    metaDescription: globalMetaDescription,
    socialCard: globalSocialCard
  } = defaultMetaData.data;

  const {
    metaTitle: pageMetaTitle,
    metaDescription: pageMetaDescription,
    socialCard: pageSocialCard,
    title: pageTitle
  } = pageMetaData;

  const defaultTitle = "Ones Basketball League";
  const metaTitle = pageMetaTitle || pageTitle || globalMetaTitle;
  const metaDescription = pageMetaDescription || globalMetaDescription;

  const socialTitle =
    pageSocialCard[0]?.socialCardTitle ||
    pageMetaTitle ||
    globalSocialCard[0]?.socialCardTitle ||
    globalMetaTitle;
  const socialDescription =
    pageSocialCard[0]?.socialCardDescription ||
    pageMetaDescription ||
    globalSocialCard[0]?.socialCardDescription ||
    globalMetaDescription;
  const socialImage = pageSocialCard[0]?.socialCardImage || globalSocialCard[0]?.socialCardImage;

  return (
    <Head>
      {/* General Meta Tags */}
      <title>{metaTitle ? `${metaTitle} – ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0, minimal-ui, viewport-fit=cover"
      />
      <meta name="theme-color" content="#000" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="mask-icon" href="/favicon.svg" color="#000"></link>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://oblhoops.com/" />
      <meta property="og:type" content="website" />
      {socialTitle && <meta property="og:title" content={`${socialTitle} – ${defaultTitle}`} />}
      {socialDescription && <meta property="og:description" content={socialDescription} />}
      {socialImage && <meta name="og:image" content={socialImage?.url} />}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="oblhoops.com" />
      <meta property="twitter:url" content="https://oblhoops.com/" />
      {socialTitle && <meta name="twitter:title" content={`${socialTitle} - ${defaultTitle}`} />}
      {socialDescription && <meta name="twitter:description" content={socialDescription} />}
      {socialImage && <meta name="twitter:image" content={socialImage?.url} />}
    </Head>
  );
};

export default CustomHead;
