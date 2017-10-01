import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import {wordsPropType} from './words';
import WordTableRow from './WordTableRow'

class WordTable extends Component {
  static propTypes = {
    words: wordsPropType
  }

  render() {
    const { words } = this.props

    return (
      <Table striped responsive>
        <tbody>
          {
            words.map((word, index) =>
              <WordTableRow
                key={index}
                number={index+1}
                word={word}
              />
            )
          }
        </tbody>
      </Table>
    );
  }
}

export default WordTable;
