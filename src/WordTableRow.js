import React, {Component} from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {wordPropType} from './words';


class WordTableRow extends Component {
  static propTypes = {
    number: PropTypes.number,
    word: wordPropType
  }

  onChange = (value) => {
    this.props.word.setKnow(value);
  };

  render() {
    const { number, word } = this.props

    return (
      <tr>
        <td width="1px">
          {number}
        </td>
        <td>
          {
            <a
              href={`http://endic.naver.com/search.nhn?sLn=en&isOnlyViewEE=N&query=${word.term}`}
              target="_blank"
              title={`Group: ${word.group}`}
            >
              {word.term}
            </a>
          }
        </td>
        <td>
          <ToggleButtonGroup
            type="radio"
            name="know"
            value={word.know}
            onChange={this.onChange}
          >
            <ToggleButton value={true} bsSize="large" bsStyle={word.know === true  ? 'success' : 'default'}>✓</ToggleButton>
            <ToggleButton value={false} bsSize="large"  bsStyle={word.know === false ? 'danger' : 'default'}>✗</ToggleButton>
          </ToggleButtonGroup>
        </td>
      </tr>
    );
  }
}

export default WordTableRow;
