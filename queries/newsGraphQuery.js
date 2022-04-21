export const newsGraphQuery = `{
  news {
    ...newsFields
    pinnedNewsPost {
      title
      source
      coverImage
      postDate
      externalLink
    }
  }
}`;
