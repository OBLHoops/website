import React from "react";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { linkResolver, repositoryName } from "@root/prismicio";
import useScrollRestoration from "@hooks/useScrollRestoration";
import Layout from "@components/Layout";
import { BannerProvider } from "@contexts/bannerSize";
import { classNames } from "@lib/utilities";
import "focus-visible";
import "@styles/globals.scss";

const isServerSideRendered = () => {
  return typeof window === "undefined";
};

if (process.env.NODE_ENV !== "production" && !isServerSideRendered()) {
  const config = {
    runOnly: {
      type: "tag",
      values: ["wcag2a", "wcag2aa"]
    }
  };
  import("react-dom").then((ReactDOM) => {
    import("@axe-core/react").then((axe) => {
      axe.default(React, ReactDOM, 1000, config);
    });
  });
}

export default function CustomApp({ Component, pageProps, router }) {
  useScrollRestoration(router);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => {
        const { className, activeclass, ...mutatedProps } = props;
        const isActiveLink =
          (activeclass && router.asPath === href) || router.asPath.startsWith(href);
        return (
          <Link href={href} scroll={false}>
            <a {...mutatedProps} className={classNames([className, isActiveLink && activeclass])}>
              {children}
            </a>
          </Link>
        );
      }}
    >
      <BannerProvider>
        <PrismicPreview repositoryName={repositoryName}>
          {getLayout(<Component {...pageProps} key={router.route} />)}
        </PrismicPreview>
      </BannerProvider>
    </PrismicProvider>
  );
}
