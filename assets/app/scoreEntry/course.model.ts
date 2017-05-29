export class Course {
  name: string;
  slope: number;
  rating: number;
  courseId?: string;
  userId?: string;

  constructor( name: string, slope: number, rating: number, courseId?: string, userId?: string) {
    this.name = name;
    this.slope = slope;
    this.rating = rating;
    this.courseId = courseId;
    this.userId = userId;
  }
}
