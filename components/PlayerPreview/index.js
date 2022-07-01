import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import Picture from "@components/Picture";
import Icon from "./Icon";
import Crown from "./Crown";
import PlayerDialog from "@components/PlayerDialog";
import VideoPlayer from "@components/VideoPlayer";
import { v4 as uuidv4 } from "uuid";
import styles from "./playerPreview.module.scss";

export default function PlayerPreview({ slug, data, rank }) {
  const [dialogActive, setDialogActive] = useState(false);
  const handleClick = () => {
    setDialogActive(!dialogActive);
  };
  if (data) {
    return (
      <div className={styles.preview}>
        <div className={styles.image} aria-hidden="true">
          {data.photo?.url && <Picture image={data.photo} />}
          <div className={styles.playerRank}>{rank + 1 < 19 ? rank + 1 : "WC"}</div>
          {data.cityChamp && (
            <div className={styles.cityChamp}>
              <Crown />
            </div>
          )}
        </div>
        <div className={styles.content}>
          {data?.name && <h3>{data.name}</h3>}
          {data?.location && <p className={styles.location}>{data.location}</p>}
          {data?.bio && data?.bio[0].text && (
            <button onClick={handleClick} className={styles.bio}>
              Player bio
            </button>
          )}
          <table className={styles.stats}>
            <tbody>
              <tr>
                <th>Wins</th>
                <th>Loses</th>
              </tr>
              <tr>
                <td>{data?.wins}</td>
                <td>{data?.loses}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {data?.socialLinks && (
          <ul className={styles.socialLinks}>
            {data.socialLinks.map((link) => (
              <li key={uuidv4()}>
                <a
                  target="_blank"
                  aria-describedby="new-window-2"
                  rel="noopener noreferrer"
                  aria-label={link.platformName}
                  href={link.platformLink.url}
                >
                  <Icon url={link.platformIcon.url} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <PlayerDialog isOpen={dialogActive} toggle={handleClick}>
          {data.video && <VideoPlayer video={data.video} />}
          <h4>{data.name}</h4>
          {data?.location && <p>{data.location}</p>}
          <PrismicRichText field={data.bio} />
        </PlayerDialog>
      </div>
    );
  }
  return null;
}
