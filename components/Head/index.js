import Head from "next/head";

const CustomHead = ({ title, description }) => {
  const defaultTitle = "Ones Basketball League";
  const metaTitle = title || "One ruler of the court";
  const metaDescription = description || "The official home of 1v1 basketball.";
  const socialTitle = metaTitle;
  const socialDescription = metaDescription;
  const socialImage = "https://oblhoops.com/preview.png";

  return (
    <Head>
      {/* General Meta Tags */}
      <title>{metaTitle ? `${metaTitle} – Ones Basketball League` : defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0, minimal-ui, viewport-fit=cover"
      />
      <meta name="theme-color" content="#000" />
      <link rel="alternate icon" type="image/png" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://oblhoops.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${socialTitle} – ${defaultTitle}`} />
      <meta property="og:description" content={socialDescription} />
      <meta name="og:image" content={socialImage} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="oblhoops.com" />
      <meta property="twitter:url" content="https://oblhoops.com/" />
      <meta name="twitter:title" content={`${socialTitle} - ${defaultTitle}`} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={socialImage} />
    </Head>
  );
};

export default CustomHead;
