import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { Disclosure } from "@headlessui/react";

import { v4 as uuidv4 } from "uuid";
import ContentContainer from "@components/ContentContainer";
import { classNames } from "@lib/utilities";
import styles from "./faq.module.scss";

const FrequentlyAskedQuestions = ({ slice }) => {
  const { primary, items } = slice;

  const Item = ({ question, answer }) => (
    <Disclosure as="div" className={styles.item}>
      {({ open }) => (
        <>
          <h3>
            <Disclosure.Button className={styles.button}>
              <div>{question}</div>
              <svg
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
              >
                <circle cx="22.5" cy="22.5" r="22.5" fill="black" />
                <path
                  d="M12 22.04H32.0802"
                  stroke="white"
                  strokeWidth="2.72826"
                  strokeMiterlimit="10"
                  className={styles.iconX}
                />
                <path
                  d="M22.04 12V32.0802"
                  stroke="white"
                  strokeWidth="2.72826"
                  strokeMiterlimit="10"
                  className={classNames([styles.iconY, open && styles.open])}
                />
              </svg>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className={styles.panel}>
            <PrismicRichText field={answer} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
  if (items[0]?.question && items[0]?.answer.length) {
    return (
      <section className={classNames([styles.faq])}>
        <ContentContainer>
          <PrismicRichText field={primary.title} />
          <PrismicRichText field={primary.description} />

          {items && items.map((item) => <Item {...item} key={uuidv4()} />)}
        </ContentContainer>
      </section>
    );
  }
  return null;
};

export default FrequentlyAskedQuestions;
