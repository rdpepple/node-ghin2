export class ScoreMarked {
  constructor( public used: boolean,
               public date_played: string,
               public course: string,
               public slope: number,
               public rating: number,
               public score: number) {}
}