import React, { useState, useEffect } from 'react';
import { CircularProgress, Text, Box, Flex } from "@chakra-ui/core";
import { motion } from 'framer-motion';
import * as ExercisesApi from './../helpers/exercises';

function Exercises() {
  const [exercises, setExercises] = useState();

  const GetData = () => {
    ExercisesApi.getAllExercises()
      .then(data => setExercises(data)
      )
  }

  useEffect(GetData, [])

  const Card = motion.custom(Box)
  const Exercises = (exercises) => {
    return (
      <Card
        shadow="0 6px 8px 0 rgba(0,0,0,0.08)"
        borderRadius="16px"
        width="calc(50% - 20px);"
        key={exercises._id}
        m="10px"
        overflow="hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ ease: "easeOut", duration: 0.4 }}
        transformTemplate={(props, transform) =>
          // Disable GPU acceleration to prevent blurry text
          transform.replace(" translateZ(0)", "")
        }
      >
        <Box background="#DB6D00" >
          <Text as="h2" p="10px" fontWeight="bold" color="white">
            {exercises.name}
          </Text>
        </Box>
        <Box p="10px">
        <Text>Ruch: {exercises.type}</Text>
        <Text>Link do ćwiczenia: {exercises.videoLink}</Text>
        <Text>Mięśnie główne: </Text>{exercises.muscleGroups.primary.map(primary => <Text key={primary}>{primary}</Text>)}
        <Text>Mięśnie pomocnicze: </Text>{exercises.muscleGroups.secondary.map(secondary => <Text key={secondary}>{secondary}</Text>)}
        </Box>
      </Card>
    )
  }

  return (
    <Flex flexWrap="wrap">
      {exercises === undefined ? <CircularProgress isIndeterminate></CircularProgress> : exercises.map(ex => Exercises(ex))}
    </Flex>
  );
}

export default Exercises;
