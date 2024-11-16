
import { Courses } from '../../courses/models';
import { User } from '../../users/models';

export interface Inscripcion {
  id: string;
  userId: string;
  cursoId: string;
  user?: User;
  curso?: Courses;
}