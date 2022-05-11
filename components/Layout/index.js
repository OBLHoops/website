import React from "react";
import { useRouter } from "next/router";
import { ParallaxProvider } from "react-scroll-parallax";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Banner from "@components/Banner";
import Overlay from "@components/Overlay";

export default function Layout({ children, preview }) {
  const router = useRouter();
  const route = router.asPath === "/" ? "homepage" : router.asPath;
  const childProps = React.Children.map(children?.props?.children, (child) => {
    return {
      bannerData: child?.props?.bannerData,
      navData: child?.props?.navData,
      footerData: child?.props?.footerData,
      preview: child?.props?.preview
    };
  });
  return (
    <ParallaxProvider>
      {childProps && <Banner bannerData={childProps[0].bannerData} />}
      {childProps && <Header navData={childProps[0].navData} />}
      {children}
      {childProps && <Footer footerData={childProps[0].footerData} key={route} />}
      <div>
        <Overlay key={route} />
      </div>
      <div hidden>
        <span id="new-window-0">Opens in a new window</span>
        <span id="new-window-1">Opens an external site</span>
        <span id="new-window-2">Opens an external site in a new window</span>
      </div>
    </ParallaxProvider>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
