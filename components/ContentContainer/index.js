import { classNames } from "@lib/utilities";
import styles from "./contentContainer.module.scss";

export default function ContentContainer(props) {
  const { margin, className, children, ...remainingProps } = props;
  return (
    <div
      className={classNames([
        styles.container,
        margin && styles[`margin-${margin}`],
        className && className
      ])}
      {...remainingProps}
    >
      <div>{children}</div>
    </div>
  );
}
