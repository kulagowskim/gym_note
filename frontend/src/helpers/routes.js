const serverUrl = "http://localhost:9000"

export const exercisesUrl = id =>
  id ? `${serverUrl}/exercises/${id}` : `${serverUrl}/exercises`