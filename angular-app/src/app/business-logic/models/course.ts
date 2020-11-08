export interface Course {
  code: string;
  title: string;
  worth: number;
  pre: string[];
  grade?: string;
}

// export class Course {
//   constructor(
//     code: string,
//     title: string,
//     worth: number,
//     pre: string[],
//     grade?: string,
//   ) { }
// }