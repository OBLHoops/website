import { PrismicLink } from "@prismicio/react";
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
              {footerData.data.links.map((item) => (
                <li key={uuidv4()}>
                  <PrismicLink
                    field={item.link}
                    target={item.link.link_type == "Web" ? "_blank" : "_self"}
                  >
                    {item.label}
                  </PrismicLink>
                </li>
              ))}
            </ul>
          </div>
          <ul className={styles.socialLinks}>
            {footerData.data.socialLinks.map((link) => (
              <li key={uuidv4()}>
                <a
                  target="_blank"
                  aria-describedby="new-window-2"
                  rel="noopener noreferrer"
                  aria-label={link.platformName}
                  href={link.platformLink.url}
                >
                  <img src={link.platformIcon.url} alt={link.platformName} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    );
  }
  return null;
}
