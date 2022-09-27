# oblhoops.com

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The website is built with [Next.js](https://nextjs.org/), a [React](https://reactjs.org/) framework, using [Prismic](https://prismic.io/) to manage the content and uses [DigitalOcean](https://www.digitalocean.com/) to build, deploy and host the website.

The website utilizes [Prismic Slice Machine](https://prismic.io/docs/core-concepts/slice-machine) to build pages and model content within Prismic.

## Run locally

First, change name of `_env.local` to `.env.local` in the root of the project

Then, install the package dependencies:

```bash
npm i
```

Then, run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional notes

- Component level [CSS modules](https://github.com/css-modules/css-modules) are used which has built-in support through [Next.js](https://nextjs.org/docs/basic-features/built-in-css-support)
- [SCSS](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) flavor of SASS is used

## Package dependencies

- [@headlessui/react](https://www.npmjs.com/package/@headlessui/react) - used for dropdowns, modals, and accordions
- [@mailchimp/mailchimp_marketing](https://www.npmjs.com/package/@mailchimp/mailchimp_marketing) - used to interface with the Mailchimp API
- [@prismicio/client](https://www.npmjs.com/package/@n8tb1t/@prismicio/client) - required Prismic package
- [@prismicio/helpers](https://www.npmjs.com/package/@n8tb1t/@prismicio/helpers) - required Prismic package
- [@prismicio/next](https://www.npmjs.com/package/@n8tb1t/@prismicio/next) - required Prismic package
- [@prismicio/react](https://www.npmjs.com/package/@n8tb1t/@prismicio/react) - required Prismic package
- [@prismicio/slice-simulator-react](https://www.npmjs.com/package/@n8tb1t/@prismicio/slice-simulator-react) - required Prismic package
- [@typeform/embed-react](https://www.npmjs.com/package/@n8tb1t/@typeform/embed-react) - used to embed Typeform forms
- [date-fns](https://www.npmjs.com/package/@n8tb1t/date-fns) - used to format dates
- [focus-visible](https://www.npmjs.com/package/focus-visible) - only show focus outline when navigating the site using a keyboard
- [framer-motion](https://www.npmjs.com/package/framer-motion) - UI animations
- [isomorphic-unfetch](https://www.npmjs.com/package/isomorphic-unfetch) - used to subscribe users through the Mailchimp API
- [next](https://www.npmjs.com/package/next) - primary website framework
- [react](https://www.npmjs.com/package/react) - standard React
- [react-dom](https://www.npmjs.com/package/react-dom) - standard React DOM
- [react-fast-marquee](https://www.npmjs.com/package/react-fast-marquee) - used for the scrolling marquee component
- [react-focus-on](https://www.npmjs.com/package/react-focus-on) - used to lock focus and prevent scrolling for modals and full screen takeovers
- [react-gtm-module](https://www.npmjs.com/package/react-gtm-module) - integrates support for Google Tag Manager
- [react-use](https://www.npmjs.com/package/react-use) - React hooks library
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) - used to know when element enter or leave the viewport
- [react-scroll-parallax](https://www.npmjs.com/package/react-scroll-parallax) - used to parallax elements
- [sass](https://www.npmjs.com/package/sass) - allows use of SASS/SCSS
- [slugify](https://www.npmjs.com/package/slugify) - creates usable slugs from strings
- [swr](https://www.npmjs.com/package/swr) - React Hooks library for data fetching
- [uuid](https://www.npmjs.com/package/uuid) - used to create unique IDs
