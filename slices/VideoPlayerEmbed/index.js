import { classNames } from "@lib/utilities";
import styles from "./videoPlayerEmbed.module.scss";

const VideoPlayerEmbed = ({ slice }) => {
  if (slice.primary?.videoEmbedLink?.embed_url || slice.primary?.videoEmbedLink?.html) {
    const EmbedWrapper = ({ children }) => {
      return (
        <section
          className={classNames([
            styles.videoEmbed,
            slice.primary.spacing && styles[`spacing-${slice.primary.spacing}`]
          ])}
        >
          <div className={styles.container}>
            <div className={styles.wrapper}>{children}</div>
          </div>
        </section>
      );
    };

    const YouTubeEmbed = ({ width, height, title }) => {
      const parsedUrl = new URL(slice.primary.videoEmbedLink.embed_url);
      const videoId = parsedUrl.searchParams.get("v");
      const playerParams = slice.primary.autoplay
        ? "disablekb=1&rel=0&modestbranding=1&autoplay=1&loop=1&mute=1"
        : "disablekb=1&rel=0&modestbranding=1";
      return (
        <iframe
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}?${playerParams}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      );
    };

    const VimeoEmbed = ({ video_id, width, height, title }) => {
      const playerParams = slice.primary.autoplay
        ? "autoplay=true&muted=true&playsinline=true"
        : "";
      return (
        <>
          <iframe
            src={`https://player.vimeo.com/video/${video_id}?${playerParams}`}
            width={width}
            height={height}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen=""
            title={title}
          ></iframe>
        </>
      );
    };

    if (slice.primary.videoEmbedLink.provider_name === "YouTube") {
      return (
        <EmbedWrapper>
          <YouTubeEmbed {...slice.primary.videoEmbedLink} />
        </EmbedWrapper>
      );
    }

    if (slice.primary.videoEmbedLink.provider_name === "Vimeo") {
      return (
        <EmbedWrapper>
          <VimeoEmbed {...slice.primary.videoEmbedLink} />
        </EmbedWrapper>
      );
    }

    return (
      <EmbedWrapper>
        <div dangerouslySetInnerHTML={{ __html: slice.primary.videoEmbedLink.html }} />
      </EmbedWrapper>
    );
  }
  return null;
};

export default VideoPlayerEmbed;
