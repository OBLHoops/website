import Link from "next/link";
import Picture from "@components/Picture";
import styles from "./playerPreview.module.scss";

export default function PlayerPreview({ slug, data, rank }) {
  if (data) {
    return (
      <div className={styles.preview}>
        {/* <Link href={`/players/${slug}`}>
          <a> */}
        <div className={styles.image} aria-hidden="true">
          {data.photo.url && <Picture image={data.photo} />}
          <div className={styles.playerRank}>{rank + 1}</div>
        </div>
        <div className={styles.content}>
          {data.name && <h3>{data.name}</h3>}
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
        {/* </a>
        </Link> */}
      </div>
    );
  }
  return null;
}
