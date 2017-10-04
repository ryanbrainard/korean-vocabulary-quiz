import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import WordQuiz from './WordQuiz';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WordQuiz/>, div);
});

it('calculates results', () => {
  const words = [
    {
      rank:    0,
      term:    'word',
      group:   'A',
    },
    {
      rank:    1,
      term:    'word',
      group:   'A',
    },
    {
      rank:    2,
      term:    'word',
      group:   'B',
    },
    {
      rank:    3,
      term:    'word',
      group:   'A',
    },
    {
      rank:    4,
      term:    'word',
      group:   'A',
    }
  ]

  const q = shallow(<WordQuiz words={words}/>).instance()

  const sample = words.slice(0, 3)
  sample[0].know = true
  sample[1].know = false
  sample[2].know = true

  expect(q.calcResults(sample)).toEqual({
    "allCounts": {
      "A": 4,
      "B": 1,
      "C": 0,
    },
    "sampleCounts": {
      "A": 2,
      "B": 1,
      "C": 0,
    },
    "sampleKnowPercByGroup": {
      "A": 0.5,
      "B": 1,
      "C": 0,
    },
    "allKnowCountByGroup": {
      "A": 2,
      "B": 1,
      "C": 0,
    },
    "allKnowCount": 3,
  })
});
