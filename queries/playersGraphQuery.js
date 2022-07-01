export const playersGraphQuery = `{
  players {
    ...playersFields
    players {
      player {
        name
        bio
        video
        photo
        location
        wins
        loses
        cityChamp
        cityChampOf
        socialLinks {
          platformName
          platformLink
          platformIcon
        }
      }
    }
  }
}`;
