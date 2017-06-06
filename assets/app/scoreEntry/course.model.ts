export class Course {
  constructor( public name: string,
               public slope: number,
               public rating: number,
               public userId?: string) {}
}