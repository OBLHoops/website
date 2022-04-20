export const pageGraphQuery = `{
  page {
    ...pageFields
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
              ...itemsFields
            }
          }
        }
      }
      ...on social {
        variation {
          ...on default {
            primary {
              ...primaryFields
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
      ...on frequently_asked_questions {
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
    }
  }
}`;
