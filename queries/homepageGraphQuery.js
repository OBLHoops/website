export const homepageGraphQuery = `{
  homepage {
    ...homepageFields
    slices {
      ...on text {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
          }
        }
      }
      ...on text_asset {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
            items {
              ...itemsFields
            }
          }
          ...on withIntroText {
            primary {
              ...primaryFields
            }
            items {
              ...itemsFields
            }
          }
        }
      }
      ...on schedule {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
            items {
              location {
                title
                image
                startDateTime
                endDateTime
              }
            }
          }
        }
      }
      ...on social {
        variation {
          ...on default {
            primary {
              socialContentLink {
                socialHandle
                socialLinks
                images
              }
            }
          }
        }
      }
      ...on marquee {
        variation {
          ...on default {
            primary {
              theme
              marquee {
                label
                items
              }
            }
          }
        }
      }
      ...on image {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
          }
        }
      }
      ...on partners {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
            items {
              ...itemsFields
            }
          }
        }
      }
      ...on video_player_embed {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
          }
        }
      }
      ...on email_sign_up {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
          }
        }
      }
      ...on latest_news {
        variation {
          ...on default {
            primary {
              ...primaryFields
            }
          }
        }
      }
    }
  }
}`;
