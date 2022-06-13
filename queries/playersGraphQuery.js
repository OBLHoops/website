export const playersGraphQuery = `{
  players {
    ...playersFields
    players {
      player {
        name
        bio
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
