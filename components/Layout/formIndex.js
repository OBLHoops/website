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
  return (
    <>
      {children}
      <Overlay key={route} />
      <div hidden>
        <span id="new-window-0">Opens in a new window</span>
        <span id="new-window-1">Opens an external site</span>
        <span id="new-window-2">Opens an external site in a new window</span>
      </div>
    </>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
