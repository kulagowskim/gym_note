import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import theme from './theme';

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import EditExercise from "./components/pages/EditExercise";
import CreateExercise from "./components/pages/CreateExercise";
import CreateUser from "./components/pages/CreateUser";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import NotFound from './components/pages/404';
import Exercises from './components/pages/Exercises';

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
            <Route path="/exercises" component={Exercises} />
            <Route path="/user" component={CreateUser} />
            <Route path="/profile" component={Profile} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
