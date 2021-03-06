export interface User {
  email: string,
  password: string,
  first_name?: string,
  last_name?: string,
}

export class Student implements User {
  constructor(
    public email: string,
    public student_id: number,
    public password: string,
    public first_name?: string,
    public last_name?: string,
  ) { }
}