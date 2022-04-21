import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FocusOn } from "react-focus-on";
import Link from "next/link";
import { classNames } from "@lib/utilities";
import Logo from "@components/Logo";
import Nav from "@components/Nav";
import Menu from "@components/Menu";
import Toggle from "../Nav/toggle";
import styles from "./header.module.scss";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { useEffect } from "react";

export default function Header({ navData }) {
  const [navOpen, setNavOpen] = useState(false);

  const screenSize = useWindowDimensions();
  useEffect(() => {
    if (screenSize.width >= 768) {
      setNavOpen(false);
    }
  }, [screenSize]);

  return (
    <header className={classNames([styles.header, navOpen && styles.navOpen])}>
      <a className={styles.skipToContentLink} href="#main">
        Skip to Content
      </a>

      <FocusOn enabled={navOpen}>
        <div className={classNames([styles.navWrapper, navOpen && styles.navOpen])}>
          <div className={styles.logo}>
            <Link href="/">
              <a
                onClick={() => setNavOpen(false)}
                onKeyPress={() => setNavOpen(false)}
                role="link"
                tabIndex={0}
                title="Return to homepage"
              >
                <Logo />
              </a>
            </Link>
          </div>
          <Nav navData={navData} toggle={(isOpen) => setNavOpen(isOpen)} />
          <Toggle navOpen={navOpen} toggle={(isOpen) => setNavOpen(isOpen)} />
        </div>
        <AnimatePresence>
          {navOpen && <Menu navData={navData} toggle={(isOpen) => setNavOpen(isOpen)} />}
        </AnimatePresence>
      </FocusOn>
    </header>
  );
}
