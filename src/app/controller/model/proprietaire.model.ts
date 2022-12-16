import {User} from './user.model';


export interface Proprietaire {
  id: number;
  avatar?: string | null;
  avatarContentType?: string | null;
  cin?: string | null;
  rib?: string | null;
  numTel?: string | null;
  user?: User | null;
}


