import React, {Component} from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class WordTableRow extends Component {
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
              target="naverDict">
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
            <ToggleButton value={true}>알아요</ToggleButton>
            <ToggleButton value={false}>몰라</ToggleButton>
          </ToggleButtonGroup>
        </td>
      </tr>
    );
  }
}

export default WordTableRow;
