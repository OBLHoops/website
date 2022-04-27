import { classNames } from "@lib/utilities";
import styles from "./contentContainer.module.scss";

export default function ContentContainer({ children, margin }) {
  return (
    <div className={classNames([styles.container, margin && styles[`margin-${margin}`]])}>
      <div>{children}</div>
    </div>
  );
}
