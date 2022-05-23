import { PrismicLink } from "@prismicio/react";
import { classNames } from "@lib/utilities";
import { ExternalLink } from "@components/Icon";
import styles from "./nav.module.scss";

export default function Nav({ toggle, navData }) {
  if (navData?.data) {
    return (
      <nav className={styles.nav}>
        {navData.data?.links.length && (
          <ul>
            {navData.data.links.map((item, index) => (
              <li key={index}>
                <PrismicLink
                  field={item.link}
                  className={styles.link}
                  activeclass={styles.active}
                  onClick={() => toggle(false)}
                  onKeyPress={() => toggle(false)}
                  target={item.link.link_type == "Web" ? "_blank" : "_self"}
                >
                  <span>
                    {item.label}
                    {item.link.link_type == "Web" && (
                      <ExternalLink className={styles.externalLink} />
                    )}
                  </span>
                </PrismicLink>
              </li>
            ))}
          </ul>
        )}
        {navData.data.buttonLink && (
          <PrismicLink
            field={navData.data.buttonLink}
            className={classNames([styles.button, styles.fill])}
            onClick={() => toggle(false)}
            onKeyPress={() => toggle(false)}
            target={navData.data.buttonLink.link_type == "Web" ? "_blank" : "_self"}
          >
            {navData.data.buttonLabel}
            {navData.data.buttonLink.link_type == "Web" && (
              <ExternalLink className={styles.externalLink} />
            )}
          </PrismicLink>
        )}
      </nav>
    );
  }
  return null;
}
