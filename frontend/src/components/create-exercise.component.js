import React, { useState } from 'react';

function CreateExercise() {
  const [ username, setUsername ] = useState("");
  const [ description, setDescripription ] = useState("");
  const [ duration, setDuration] = useState(0);
  const [ date, setDate ] = useState(new Date());
  const [ users, setUsers ] = useState([]);

  return (
    <div>CreateExercise</div>
  );
}

export default CreateExercise;