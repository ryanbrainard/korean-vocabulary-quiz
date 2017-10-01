import React, { Component } from 'react';
import './App.css';
import {WORDS} from './words';
import WordQuiz from './WordQuiz';
import { Grid } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div>
        <div className="a2a_kit a2a_kit_size_24 a2a_floating_style a2a_vertical_style" style={{right: '0px', top: '200px'}}>
          {/* eslint-disable */}
          <a className="a2a_button_facebook"></a>
          <a className="a2a_button_twitter"></a>
          <a className="a2a_button_reddit"></a>
          <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
          {/* eslint-enable */}
        </div>

        <Grid>
          <WordQuiz
            words={WORDS}
            sampleSize={50}
          />

          <footer>
            <hr/>
            Made in Korea.
            &nbsp;
            <a href="https://github.com/ryanbrainard/korean-vocabulary-quiz" target="_blank" rel="noopener noreferrer">
              View Source
            </a>
            <hr/>
          </footer>
        </Grid>
      </div>
    );
  }
}

export default App;
