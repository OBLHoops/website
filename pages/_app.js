import React, { useEffect, useRef } from "react";
import "focus-visible";
import Layout from "@components/Layout";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { linkResolver, repositoryName } from "../prismicio";
import { BannerProvider } from "@contexts/bannerSize";
import { classNames } from "@lib/utilities";
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
  const isBrowserNavigation = useRef(false);

  useEffect(() => {
    const handleRouteComplete = (url, { shallow }) => {
      console.log(
        `Route change complete to ${url} ${shallow ? "with" : "without"} shallow routing`
      );

      // Array of URL terms to prevent scroll to top
      const preventScroll = ["?filter="];

      // Delay scroll to top an route change
      if (!preventScroll.some((v) => url.includes(v)) && !isBrowserNavigation.current) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0
          });
          isBrowserNavigation.current = false;
        }, 100);
      }
    };

    // detect browser navigation (back/forward)
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        isBrowserNavigation.current = true;
      }
      return true;
    });

    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      // detect browser navigation (back/forward)
      router.beforePopState(() => true);

      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router]);

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
