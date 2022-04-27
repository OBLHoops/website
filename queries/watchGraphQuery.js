export const watchGraphQuery = `{
  watch {
    ...watchFields
    pinnedWatchPost {
      title
      source
      coverImage
      postDate
      externalLink
    }
  }
}`;
