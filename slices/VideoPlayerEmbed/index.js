import { classNames } from "@lib/utilities";
import styles from "./videoPlayerEmbed.module.scss";

const VideoPlayerEmbed = ({ slice }) => {
  if (slice.primary?.videoEmbedLink?.embed_url || slice.primary?.videoEmbedLink?.html) {
    const parsedUrl = new URL(slice.primary.videoEmbedLink.embed_url);
    const youTubeEmbedId = parsedUrl.searchParams.get("v");
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
                src={`https://www.youtube.com/embed/${youTubeEmbedId}?disablekb=1`}
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
