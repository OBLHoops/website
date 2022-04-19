import ContentContainer from "@components/ContentContainer";
import styles from "./videoPlayerEmbed.module.scss";

const VideoPlayerEmbed = ({ slice }) => {
  console.log(slice);
  return (
    <section className={styles.videoEmbed}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div dangerouslySetInnerHTML={{ __html: slice.primary.videoEmbedLink.html }} />
        </div>
      </div>
    </section>
  );
};

export default VideoPlayerEmbed;
