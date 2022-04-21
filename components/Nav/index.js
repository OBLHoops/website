import { PrismicLink } from "@prismicio/react";
import { classNames } from "@lib/utilities";
import styles from "./nav.module.scss";

export default function Nav({ toggle, navData }) {
  if (navData?.data) {
    console.log(navData);
    return (
      <nav className={styles.nav}>
        <ul>
          {navData.data.links.map((item, index) => (
            <li key={index}>
              <PrismicLink
                field={item.link}
                title={item.label}
                className={styles.link}
                activeclass={styles.active}
                onClick={() => toggle(false)}
                onKeyPress={() => toggle(false)}
                target={item.link.link_type == "Web" ? "_blank" : "_self"}
              >
                {item.label}
              </PrismicLink>
            </li>
          ))}
        </ul>
        <PrismicLink
          field={navData.data.buttonLink}
          title={navData.data.buttonLabel}
          className={classNames([styles.button, styles.fill])}
          onClick={() => toggle(false)}
          onKeyPress={() => toggle(false)}
          target={navData.data.buttonLink == "Web" ? "_blank" : "_self"}
        >
          {navData.data.buttonLabel}
        </PrismicLink>
      </nav>
    );
  }
  return null;
}
