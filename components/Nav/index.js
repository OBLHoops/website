import ActiveLink from "@components/ActiveLink";
import { classNames } from "@lib/utilities";
import styles from "./nav.module.scss";

export default function Nav({ toggle, navData }) {
  return (
    <nav className={styles.nav}>
      <ul>
        {navData.data.links.map((item, index) => (
          <li key={index}>
            <ActiveLink href={`/${item.link.uid}`} activeClassName={styles.active}>
              <a
                title={item.label}
                className={classNames([styles.link, item.theme && styles[item.theme]])}
                onClick={() => toggle(false)}
                onKeyPress={() => toggle(false)}
                role="link"
                tabIndex="0"
                target={item.link.link_type == "Web" ? "_blank" : "_self"}
              >
                {item.label}
              </a>
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
