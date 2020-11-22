export interface Course {
  code: string;
  title: string;
  worth: number;
  pre: string[];
  curriculum?: string[];
  grade?: string;
}



export class Course {
  constructor(
    public code: string,
    public title: string,
    public worth: number,
    public pre: string[],
    public curriculum?: string[],
    public grade?: string, //{A, B, C, D, F} = {4, 3, 2, 1, 0} respectively
    public term?: string,
  ) { }
}