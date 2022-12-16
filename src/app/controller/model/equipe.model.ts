import {Annonce} from './annonce.model';
import {Joueur} from './joueur.model';


export class Equipe {
  id: number;
  annonce?: Annonce | null;
  joueurs?: Joueur | null;
}


