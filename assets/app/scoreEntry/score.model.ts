export class Score {
  constructor( public date_played: string,
               public course: string,
               public slope: number,
               public rating: number,
               public score: number,
               public userId?: string) {}
}