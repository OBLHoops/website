import { useState, useRef } from "react";
import fetch from "isomorphic-unfetch";
import { classNames } from "@lib/utilities";
import styles from "./subscribe.module.scss";

export default function Subscribe({ cta }) {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: inputEl.current.value
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);
      return;
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = "";
    setMessage("Success! You are now subscribed to the newsletter.");
  };

  return (
    <div className={styles.emailSignup}>
      <div>
        <form onSubmit={subscribe}>
          <label className={styles.emailLabel}>
            <span className="visually-hidden">email address</span>
            <input
              type="email"
              className={styles.emailAddress}
              ref={inputEl}
              placeholder="email@domain.com"
            />
          </label>
          <input
            type="submit"
            value={cta ? cta : "Sign up!"}
            className={classNames([styles.signup, styles.fill])}
          />
        </form>
        {message && (
          <div className={styles.errorMessage} aria-live="polite">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
