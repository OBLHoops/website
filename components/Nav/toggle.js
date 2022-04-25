import { classNames } from "@lib/utilities";
import styles from "./nav.module.scss";

export default function Toggle({ navOpen, toggle }) {
  return (
    <button
      className={classNames([styles.toggle, navOpen && styles.navOpen])}
      onClick={() => toggle(!navOpen)}
      aria-label={navOpen ? "Close main menu" : "Open main menu"}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 28 21"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        {navOpen ? (
          <>
            <path
              d="M13.4037 9L21 1.40374L19.5963 0L12 7.59626L4.40374 0L3 1.40374L10.5963 9L3 16.5963L4.40374 18L12 10.4037L19.5963 18L21 16.5963L13.4037 9Z"
              fill="white"
            />
          </>
        ) : (
          <>
            <path d="M0 9L24 9" stroke="white" strokeWidth="2" />
            <path d="M0 17L24 17" stroke="white" strokeWidth="2" />
            <path d="M24 1H0" stroke="white" strokeWidth="2" />
          </>
        )}
      </svg>
    </button>
  );
}
