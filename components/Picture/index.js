import { useState, useRef, useEffect } from "react";
import { classNames } from "@lib/utilities";
import { v4 as uuidv4 } from "uuid";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import styles from "./picture.module.scss";

const objectMap = (obj, array) =>
  Object.fromEntries(Object.entries(obj).map(([_, val], i) => [val, array[i]]));

const Picture = ({ image }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [cached, setCached] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const imageRef = useRef();

  // define breakpoint names used in Primsic
  const breakpoints = ["xxl", "xl", "lg", "md", "sm", "xs", "base"];

  // define breakpoint min-widths
  const minWidth = [1920, 1440, 1280, 960, 640, 320, 0];

  // Define base image breakpoint data
  // Prismic flattens the base image without a key,
  // we'll use breakpoints[0] as our key
  const baseImageBreakpoint = {
    [breakpoints[breakpoints.length - 1]]: {
      dimensions: image.dimensions,
      alt: image.alt,
      copyright: image.copyright,
      url: image.url
    }
  };

  // Get all breakpoints from {image} based on our [breakpoints]
  const imageBreakpoints = Object.keys(image)
    .filter((key) => breakpoints.includes(key))
    .reduce((obj, key) => {
      obj[key] = image[key];
      return obj;
    }, {});

  // Merge imageBreakpoints and baseImageBreakpoint
  const imageData = { ...imageBreakpoints, ...baseImageBreakpoint };

  // Create an object of breakpoint keys and aspect ratio values
  const aspectRatios = objectMap(
    breakpoints,
    breakpoints.map((breakpoint) => {
      const width = imageData[breakpoint].dimensions.width;
      const height = imageData[breakpoint].dimensions.height;
      const aspectRatio = width / height;
      return aspectRatio;
    })
  );

  useEffect(() => {
    if (windowWidth < 320) {
      setAspectRatio(aspectRatios["base"]);
    }
    if (windowWidth >= 320 && windowWidth < 640) {
      setAspectRatio(aspectRatios["xs"]);
    }
    if (windowWidth >= 640 && windowWidth < 960) {
      setAspectRatio(aspectRatios["sm"]);
    }
    if (windowWidth >= 960 && windowWidth < 1280) {
      setAspectRatio(aspectRatios["md"]);
    }
    if (windowWidth >= 1280 && windowWidth < 1440) {
      setAspectRatio(aspectRatios["lg"]);
    }
    if (windowWidth >= 1440 && windowWidth < 1920) {
      setAspectRatio(aspectRatios["xl"]);
    }
    if (windowWidth >= 1920) {
      setAspectRatio(aspectRatios["xxl"]);
    }
  }, [windowWidth, aspectRatios]);

  // Device Pixel Ratios
  const dpr = ["1", "2", "3"];

  // Create srcset based on [dpr]
  const handleSrcSet = (breakpoint) =>
    dpr.map((density) => `${imageData?.[breakpoint]?.url}&dpr=${density} ${density}x`).toString();

  function handleImageLoaded() {
    if (!imageRef.current.complete) {
      setLoading(true);
    } else {
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (imageRef.current.complete) {
      setCached(true);
    } else {
      setLoading(true);
    }
  }, []);

  return (
    <>
      {image && (
        <picture
          style={{
            aspectRatio: `${aspectRatio}`
          }}
          className={classNames([
            styles.picture,
            cached && styles.cached,
            loading && styles.loading,
            loaded && styles.loaded
          ])}
        >
          {breakpoints.map((breakpoint, index) => (
            <source
              key={uuidv4()}
              media={`(min-width: ${minWidth[index]}px)`}
              srcSet={handleSrcSet(breakpoint)}
              width={imageData[breakpoint].dimensions.width}
              height={imageData[breakpoint].dimensions.height}
            />
          ))}
          {/* eslint-disable-next-line */}
          <img
            ref={imageRef}
            onLoad={handleImageLoaded}
            src={image.url}
            alt={image.alt}
            width={image.dimensions.width}
            height={image.dimensions.height}
            // loading="lazy"
            // ^ causes image to flash when in viewport on initial load
          />
        </picture>
      )}
    </>
  );
};

export default Picture;
