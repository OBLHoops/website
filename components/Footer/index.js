import Link from "next/link";
import styles from "./footer.module.scss";
import { v4 as uuidv4 } from "uuid";

export default function Footer({ footerData }) {
  if (footerData?.data) {
    return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div>
            <p>
              &copy;{new Date().getFullYear()} {footerData.data.copyright}
            </p>
            <ul>
              {footerData.data.links.map((link) => (
                <li key={uuidv4()}>
                  <Link href="/">
                    <a>{link.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul>
            {footerData.data.socialLinks.map((link) => (
              <li key={uuidv4()}>
                <Link href={link.platformLink.url} target="_blank">
                  <a
                    target="_blank"
                    aria-describedby="new-window-2"
                    rel="noopener noreferrer"
                    aria-label={link.platformName}
                  >
                    <img src={link.platformIcon.url} alt={link.platformName} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    );
  }
  return null;
}
