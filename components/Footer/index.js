import Link from "next/link";
import Logo from "@components/Logo";
import { PrismicRichText } from "@prismicio/react";
import styles from "./footer.module.scss";
import { v4 as uuidv4 } from "uuid";

export default function Footer({}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>footer</div>
    </footer>
  );
}
