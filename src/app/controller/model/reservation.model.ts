import dayjs from 'dayjs/esm';
import {Terrain} from "./terrain.model";


export interface Reservation {
  id: number;
  date?: dayjs.Dayjs | null;
  heureDebut?: dayjs.Dayjs | null;
  heureFin?: dayjs.Dayjs | null;
  terrain?: Terrain | null;
}


