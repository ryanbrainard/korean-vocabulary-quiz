import React from 'react';
import ReactDOM from 'react-dom';
import WordQuiz from './WordQuiz';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WordQuiz />, div);
});
