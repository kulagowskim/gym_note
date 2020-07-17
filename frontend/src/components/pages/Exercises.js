import React, { useState, useEffect } from 'react';
import { CircularProgress, Text, Box, Flex } from "@chakra-ui/core";

function Exercises() {
  const [exercises, setExercises] = useState();

  const GetData = () => {
    fetch('/exercises', {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(data => {
        setExercises(data);
      })
  }

  useEffect(GetData, [])

  const Exercises = (exercises) => {
    return (
      <Box
        shadow="0px 0px 12px 1px rgba(0,0,0,0.15)"
        width="calc(50% - 20px);" 
        key={exercises._id}
        p="10px"
        m="10px"
      >
        <Text>Nazwa ćwiczenia: {exercises.name}</Text>
        <Text>Ruch: {exercises.type}</Text>
        <Text>Link do ćwiczenia: {exercises.videoLink}</Text>
        <Text>Mięśnie główne: </Text>{exercises.muscleGroups.primary.map(primary=> <Text key={primary}>{primary}</Text>)}
        <Text>Mięśnie pomocnicze: </Text>{exercises.muscleGroups.secondary.map(secondary=> <Text key={secondary}>{secondary}</Text>)}
      </Box>
    )
  }

  return (
    <Flex flexWrap="wrap">
      {exercises === undefined ? <CircularProgress isIndeterminate></CircularProgress> : exercises.map(ex => Exercises(ex))}
    </Flex>
  );
}

export default Exercises;
