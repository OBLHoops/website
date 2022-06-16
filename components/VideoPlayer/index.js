import { classNames } from "@lib/utilities";
import styles from "./videoPlayer.module.scss";
export default function VideoPlayer({ video }) {
  if (video.embed_url || video.html) {
    const parsedUrl = new URL(video.embed_url);
    const youTubeEmbedId = parsedUrl.searchParams.get("v");
    return (
      <section className={classNames([styles.videoEmbed])}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            {video.provider_name === "YouTube" ? (
              <iframe
                width={video.width}
                height={video.height}
                src={`https://www.youtube.com/embed/${youTubeEmbedId}?disablekb=1&rel=0&modestbranding=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: video.html }} />
            )}
          </div>
        </div>
      </section>
    );
  }
  return null;
}
