import React, { Component } from 'react';
import './App.css';
import {WORDS} from './words';
import WordQuiz from './WordQuiz';
import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Korean Vocabulary Quiz</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav pullRight>
              <NavItem href="https://github.com/ryanbrainard/korean-vocabulary-quiz" target="_blank">Source</NavItem>
            </Nav>
          </Grid>
        </Navbar>
        <Grid>
          <WordQuiz
            words={WORDS}
            sampleSize={50}
          />
        </Grid>
      </div>
    );
  }
}

export default App;
