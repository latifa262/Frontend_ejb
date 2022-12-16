import dayjs from 'dayjs/esm';
import {STATUS} from './status.model';
import {Terrain} from './terrain.model';
import {Joueur} from './joueur.model';


export class Annonce {
  id: number;
  description?: string | null;
  heureDebut?: dayjs.Dayjs | null;
  heureFin?: dayjs.Dayjs | null;
  duree?: number | null;
  validation?: boolean | null;
  nombreParEquipe?: number | null;
  status?: STATUS | null;
  terrain?: Terrain | null;
  responsable?: Joueur | null;
}


