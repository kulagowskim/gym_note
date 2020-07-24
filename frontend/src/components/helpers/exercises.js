import { exercisesUrl } from './routes'
import * as api from './api'

export const getAllExercises = (id) =>
  api.get(exercisesUrl(id))