import {Quartier} from './quartier.model';
import {Proprietaire} from './proprietaire.model';


export class Complexe {
  id: number;
  nom?: string | null;
  longitude?: number | null;
  latitude?: number | null;
  quartier?: Quartier | null;
  proprietaire?: Proprietaire | null;
}


