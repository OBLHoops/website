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
        socialLinks {
          platformName
          platformLink
          platformIcon
        }
      }
    }
  }
}`;
