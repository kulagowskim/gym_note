import React, { useEffect, useState, useRef } from 'react';
import { Flex, Input, Button, Box, PseudoBox, Icon } from "@chakra-ui/core";

function SelectMultiPick({ options, parentCallback }) {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(options);
  const [isEditing, setEditing] = useState(false);

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const inputRef = useRef(null);

  //set focus input when click on div 
  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const filteredOptions = searched.filter(option => {
    return option.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    parentCallback(selected)
  }, [selected]
  )

  function addOption(newElement) {
    if (!selected.includes(newElement)) {
      setSelected(oldArray => [...oldArray, newElement])
    }
  };

  function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(
      initialIsVisible
    );
    const ref = useRef(null);

    const handleHideDropdown = (event) => {
      if (event.key === "Escape") {
        setIsComponentVisible(false);
      }
    };

    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
      }
    };

    useEffect(() => {
      document.addEventListener("keydown", handleHideDropdown, true);
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("keydown", handleHideDropdown, true);
        document.removeEventListener("click", handleClickOutside, true);
      };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
  }

  const OptionView = (option) => {
    return (
      <PseudoBox
        w="auto"
        p="10px"
        _hover={{ bg: "gray.200" }}
        _focus={{ boxShadow: "outline" }}
        onClick={z => {
          z.stopPropagation()
          addOption(option)
          setIsComponentVisible(false)
          setSearch("")
          setSearched(searched.filter(e => e !== option))
        }}
        key={option}
      >
        {option}
      </PseudoBox>
    )
  }

  const Item = (name) => {
    return (
      <Flex align="center" bg="black" color="white" m="5px" borderRadius="15px" key={name}>
        <Box ml="10px">{name}</Box>
        <Button
          size="xs"
          bg="black"
          mx="5px"
          h="auto"
          onClick={() => {
            searched.push(name)
            setSelected(selected.filter(e => e !== name))
          }}
        >x</Button>
      </Flex>
    )
  }

  return (
    <>
      <Flex
        border="1px solid #E2E8F0"
        justify="space-between"
        p="5px 10px"
        mt="10px"
        onClick={() => {
          setIsComponentVisible(true)
          toggleEditing()
        }}
      >
        <Flex align="center" flexWrap="wrap">
          {selected.map(part => Item(part))}
          <Input
            ref={inputRef}
            placeholder="Search..."
            value={search}
            height="auto"
            maxWidth="100px"
            border="none"
            mt="5px"
            onChange={e => setSearch(e.target.value)}
          />
        </Flex>
        <Flex align="center">
          {selected.length !== 0 && (
            <Icon
              name="small-close"
              onClick={() => {
                setSearched(searched.concat(selected))
                setSelected([])
              }}
            />
          )}
          {!isComponentVisible ? <Icon
            name="chevron-down"
          /> : <Icon
              name="chevron-up"
            />
          }
        </Flex>
      </Flex>

      <Flex ref={ref}>
        {isComponentVisible && (
          <Flex
            mt="5px"
            flexDirection="column"
            shadow="0px 0px 12px 1px rgba(0,0,0,0.15)"
            maxHeight="450px"
            overflow="auto"
            w="100%"
          >
            {search && searched.filter(e => e === search).length !== 1 &&
              <PseudoBox
                w="auto"
                p="10px"
                _hover={{ bg: "gray.200" }}
                _focus={{ boxShadow: "outline" }}
                onClick={() => {
                  setSelected(oldArray => [...oldArray, search])
                  setSearch("")
                  setIsComponentVisible(true)
                }}
              >
                Create "{search}""
            </PseudoBox>
            }
            {filteredOptions.sort((a, b) => a.localeCompare(b)).map(part => OptionView(part))}
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default SelectMultiPick;
