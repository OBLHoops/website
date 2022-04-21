import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@reach/accordion";
import "@reach/accordion/styles.css";
import { v4 as uuidv4 } from "uuid";
import ContentContainer from "@components/ContentContainer";
import { classNames } from "@lib/utilities";
import styles from "./faq.module.scss";

const FrequentlyAskedQuestions = ({ slice }) => {
  console.log(slice);
  const { primary, items } = slice;

  const Item = ({ question, answer }) => (
    <AccordionItem>
      <h3>
        <AccordionButton>
          {question}
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
              className={styles.iconY}
            />
          </svg>
        </AccordionButton>
      </h3>
      <AccordionPanel>
        <PrismicRichText field={answer} />
      </AccordionPanel>
    </AccordionItem>
  );

  return (
    <section className={classNames([styles.faq])}>
      <ContentContainer>
        <PrismicRichText field={primary.title} />
        <PrismicRichText field={primary.description} />

        {items && (
          <Accordion>
            {items.map((item) => (
              <Item {...item} key={uuidv4()} />
            ))}
          </Accordion>
        )}
      </ContentContainer>
    </section>
  );
};

export default FrequentlyAskedQuestions;
