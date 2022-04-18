import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Banner from "@components/Banner";

export default function Layout({ children, preview }) {
  const childProps = React.Children.map(children?.props?.children, (child) => {
    return {
      bannerData: child?.props?.bannerData,
      navData: child?.props?.navData,
      footerData: child?.props?.footerData,
      preview: child?.props?.preview
    };
  });

  return (
    <>
      {/* {childProps && <Banner bannerData={childProps[0].bannerData} />} */}
      <Banner />
      {/* {childProps && <Header navData={childProps[0].navData} />} */}
      <Header />
      {children}
      {/* {childProps && <Footer footerData={childProps[0].footerData} />} */}
      <Footer />
      <div hidden>
        <span id="new-window-0">Opens in a new window</span>
        <span id="new-window-1">Opens an external site</span>
        <span id="new-window-2">Opens an external site in a new window</span>
      </div>
    </>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
