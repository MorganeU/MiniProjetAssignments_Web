export class User {
    _id:string;
    username:string;
    password:string;
    role: 'Eleve'|'Professeur';
    matiere?:string
  }
  