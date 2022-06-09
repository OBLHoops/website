import { classNames } from "@lib/utilities";
import styles from "./videoPlayerEmbed.module.scss";

const VideoPlayerEmbed = ({ slice }) => {
  if (slice.primary?.videoEmbedLink?.embed_url || slice.primary?.videoEmbedLink?.html) {
    const parsedUrl = new URL(slice.primary.videoEmbedLink.embed_url);
    const youTubeEmbedId = parsedUrl.searchParams.get("v");
    const youTubeParams = slice.primary.autoplay
      ? "disablekb=1&rel=0&modestbranding=1&autoplay=1&loop=1&mute=1"
      : "disablekb=1&rel=0&modestbranding=1";
    return (
      <section
        className={classNames([
          styles.videoEmbed,
          slice.primary.spacing && styles[`spacing-${slice.primary.spacing}`]
        ])}
      >
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {slice.primary.videoEmbedLink.provider_name === "YouTube" ? (
              <iframe
                width={slice.primary.videoEmbedLink.width}
                height={slice.primary.videoEmbedLink.height}
                src={`https://www.youtube.com/embed/${youTubeEmbedId}?${youTubeParams}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={slice.primary.videoEmbedLink.title}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: slice.primary.videoEmbedLink.html }} />
            )}
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default VideoPlayerEmbed;
