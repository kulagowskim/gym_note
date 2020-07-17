import React, { useState } from 'react';
import axios from 'axios';
import { Flex, Input, Button, Select, Heading, useToast } from "@chakra-ui/core";
import SelectMultiPick from "./../SelectMultiPick"

function CreateExercise() {
  const [name, setName] = useState("");
  const [muscleGroups, setMuscleGroups] = useState(
    {
      "primary": [],
      "secondary": []
    },
  );
  const [type, setType] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const toast = useToast();

  var exer = ["klatka piersiowa", "nogi", "barki", "uda"];

  const PostData = () => {
    fetch('/exercises/add', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        name,
        muscleGroups,
        type,
        videoLink
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.error) {
          toast({
            title: "We can`t login",
            description: data.error,
            status: "error",
            duration: 4000,
            isClosable: true,
          })
        } else {
          toast({
            title: "Signedin success",
            status: "success",
            duration: 4000,
            isClosable: true,
          })
        }
      })
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onVideoLink = (e) => {
    setVideoLink(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      name,
      muscleGroups,
      type,
      videoLink
    }

    //window.location = '/';
  }

  const callbackFunctionPrimary = (childData) => {
    setMuscleGroups(prevState => ({
      ...prevState,
      "primary": childData
    }))
  }

  const callbackFunctionSecondary = (childData) => {
    setMuscleGroups(prevState => ({
      ...prevState,
      "secondary": childData
    }))
  }

  return (
    <Flex flexDirection="column" maxWidth="700px" m="auto">
      <Heading as="h2" size="lg">Create New Exercise </Heading>
      <form onSubmit={onSubmit}>
        <Input
          mt="10px"
          placeholder="Nazwa"
          value={name}
          onChange={onChangeName}
        ></Input>
        <Input mt="10px" placeholder="Link" value={videoLink}
          onChange={onVideoLink}></Input>
        <Select mt="10px" placeholder="Select option" onChange={onChangeType}>
          <option value="push">Push</option>
          <option value="pull">Pull</option>
          <option value="isolation">Isolation</option>
        </Select>
        <SelectMultiPick options={exer} parentCallback={callbackFunctionPrimary} />
        <SelectMultiPick options={exer} parentCallback={callbackFunctionSecondary} />
        <Button mt="10px" type="submit" onClick={() => PostData()}>Create Exercise Log</Button>
      </form>
    </Flex>
  );
}

export default CreateExercise;
