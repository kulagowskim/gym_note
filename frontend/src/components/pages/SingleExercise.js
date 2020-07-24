import React, { useState, useEffect } from 'react';
import * as ExercisesApi from './../../helpers/exercises'
import { useHistory } from 'react-router-dom';

function SingleExercise() {
  const [exercise, setExercise] = useState();
  const history = useHistory();

  const GetData = () => {
    ExercisesApi.getAllExercises("5f0ebb63a67acd90387ab542")
      .then((response) => {
        if (response !== undefined) {
          setExercise(response)
        } else {
          history.push('/exercises');
        }
      })
  }

  useEffect(GetData, [])
console.log(exercise);
  return (
    <div>asdasdasd</div>
  )
}

export default SingleExercise;