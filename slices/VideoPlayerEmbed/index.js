import { classNames } from "@lib/utilities";
import styles from "./videoPlayerEmbed.module.scss";

const VideoPlayerEmbed = ({ slice }) => {
  return (
    <section
      className={classNames([
        styles.videoEmbed,
        slice.primary.spacing && styles[`spacing-${slice.primary.spacing}`]
      ])}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div dangerouslySetInnerHTML={{ __html: slice.primary.videoEmbedLink.html }} />
        </div>
      </div>
    </section>
  );
};

export default VideoPlayerEmbed;
