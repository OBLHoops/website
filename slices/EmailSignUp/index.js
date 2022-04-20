import React from "react";
import { PrismicRichText } from "@prismicio/react";
import Subscribe from "@components/Subscribe";
import ContentContainer from "@components/ContentContainer";
import styles from "./emailSignUp.module.scss";

const EmailSignUp = ({ slice }) => {
  console.log(slice);
  const { primary, items } = slice;
  return (
    <section className={styles.emailSignUp}>
      <ContentContainer>
        <PrismicRichText field={primary?.emailSignUpLink?.data.title} />
        <PrismicRichText field={primary?.emailSignUpLink?.data.description} />
        <Subscribe cta={primary?.emailSignUpLink?.data.callToAction} />
      </ContentContainer>
    </section>
  );
};

export default EmailSignUp;
