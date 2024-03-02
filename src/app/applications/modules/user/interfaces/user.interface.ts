// export class User {
//   constructor(
//     public title: string,
//     public firstName: string,
//     public lastName: string,
//     public picture: string,
//     private id?: string
//   ) {}
// }

export interface User {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  // gender: string;
  // email: string;
  picture?: string;
}
