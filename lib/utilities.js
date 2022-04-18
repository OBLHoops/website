/**
 * Helper function to clean up and join class names
 * @param {array} classNames - can be a string or styles.image
 */
export const classNames = (classNames) => {
  const removeUndefined = classNames.filter((n) => n);
  const joinClassNames = removeUndefined.join(" ");
  return joinClassNames;
};

/**
 * Helper function to modify Prismic's rich text data structure to treat links
 * with labels as buttons and pass that data to a button component.
 * @param {array} textArray - rich text array from Prismic
 */
export const serializeRichText = (textArray) => {
  if (typeof textArray !== "object") return false;
  return [...textArray].map((block) => {
    const hasHyperlink = block.spans.some((e) => e.type === "hyperlink");
    const hasLabel = block.spans.some((e) => e.type === "label");
    if (hasHyperlink && hasLabel) {
      const buttonData = { ...block.spans[0].data, ...block.spans[1].data };
      const buttonText = block.text;
      const [button, style] = buttonData.label.split("-");
      return {
        type: button,
        style: style,
        link_type: buttonData.link_type,
        text: buttonText,
        slug: buttonData.url || `/${buttonData.slug}`,
        target: buttonData.target
      };
    }
    return block;
  });
};
