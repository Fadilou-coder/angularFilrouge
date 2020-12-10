import { Profil } from 'src/app/Model/profil/profil';

export class User {
   id?: number;
   email: string;
   password: string;
   nom: string;
   prenom: string;
   profil: Profil;

   constructor(id = 0, email = '', password = '', nom = '', prenom = '', profil = new Profil(1, 'Admin')){
        this.id = id;
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.profil = profil;
   }

}




