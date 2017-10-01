import React, { Component } from 'react';
import './App.css';
import {WORDS} from './words';
import WordQuiz from './WordQuiz';
import { Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Grid>
          <WordQuiz
            words={WORDS}
            sampleSize={50}
          />
          <footer>
            <hr/>
            <a href="https://github.com/ryanbrainard/korean-vocabulary-quiz" target="_blank" rel="noopener noreferrer">
              View Source
            </a>
          </footer>
        </Grid>
      </div>
    );
  }
}

export default App;
