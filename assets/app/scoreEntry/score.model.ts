export class Score {
  date_played: string;
  course: string;
  slope: number;
  rating: number;
  score: number;
  used?: boolean;
  userId?: string;

  constructor( date_played: string, course: string, slope: number,
               rating: number, score: number, used?: boolean, userId?: string) {
    this.date_played = date_played;
    this.course = course;
    this.slope = slope;
    this.rating = rating;
    this.score = score;
    this.used = used;
    this.userId = userId;
  }
}