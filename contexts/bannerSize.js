import React, { useState, useContext, createContext } from "react";

const BannerSizeContext = createContext();

export const useBannerSizeContext = () => {
  const context = useContext(BannerSizeContext);
  if (context === undefined) {
    throw new Error("useBannerSizeContext must be used within a BannerProvider");
  }
  return context;
};

export const BannerProvider = ({ children }) => {
  const [bannerSize, setBannerSize] = useState({ width: 0, height: 0 });
  return (
    <BannerSizeContext.Provider value={[bannerSize, setBannerSize]}>
      {children}
    </BannerSizeContext.Provider>
  );
};
