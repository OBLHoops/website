import styles from "./contentContainer.module.scss";

export default function ContentContainer({ children }) {
  return (
    <div className={styles.container}>
      <div>{children}</div>
    </div>
  );
}
