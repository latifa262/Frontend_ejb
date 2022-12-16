import dayjs from 'dayjs/esm';
import {GENDER} from './gender.model';
import {User} from './user.model';
import {Equipe} from './equipe.model';
import {Quartier} from './quartier.model';


export class Joueur {
  id: number;
  birthDay?: dayjs.Dayjs | null;
  gender?: GENDER | null;
  avatar?: string | null;
  avatarContentType?: string | null;
  user?: User | null;
  equipes?: Equipe | null;
  quartier?: Quartier | null;
}


