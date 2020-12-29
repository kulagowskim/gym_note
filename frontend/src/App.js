import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import theme from './theme';

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import EditExercise from "./components/pages/EditExercise";
import CreateExercise from "./components/pages/CreateExercise";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import NotFound from './components/pages/404';
import Exercises from './components/pages/Exercises';
import SingleExercise from './components/pages/SingleExercise';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Router>
        <Navbar />
        <br />
        <Box maxWidth="1250px" m="auto">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/edit/:id" component={EditExercise} />
            <Route path="/createExercise" component={CreateExercise} />
            <Route path="/exercises" exact component={Exercises} />
            <Route path="/exercise/:id" exact component={SingleExercise} />
            <Route path="/profile" component={Profile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
