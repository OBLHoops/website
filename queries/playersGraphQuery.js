export const playersGraphQuery = `{
  players {
    ...playersFields
    players {
      player {
        name
        photo
        location
        wins
        loses
        cityChamp
      }
    }
  }
}`;
