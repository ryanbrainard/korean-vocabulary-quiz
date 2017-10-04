import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Jumbotron, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {WORDS, wordsPropType} from './words';
import WordTable from './WordTable';

class WordQuiz extends Component {
  static propTypes = {
    words: wordsPropType,
    defaultSampleSize: PropTypes.number,
    availableSampleSizes: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    words: WORDS,
    defaultSampleSize: 100,
    availableSampleSizes: [10, 50, 100, 250, 500, 1000],
  }

  constructor(props, context) {
    super(props, context);
    const {words, defaultSampleSize} = this.props

    const candidates = this.prepareWords(words)
    const sampleSize = defaultSampleSize

    this.state = {
      candidates,
      sampleSize,
    };

    this.onSampleSizeChange = this.onSampleSizeChange.bind(this);
  }

  prepareWords(words) {
    return words
      .filter((word) => {
        return /^\d+$/.test(word.rank) && !(/\d/.test(word.term))
      })
      .sort(() => .5 - Math.random())
      .map((word, index) => {
        word.setKnow = (value) => {
          const candidates = this.state.candidates
          candidates[index].know = value
          this.setState({words})
        }

        return word
      })
  }

  onSampleSizeChange(e) {
    this.setState({
      sampleSize: parseInt(e.target.value, 10)
    });
  }

  groups() {
    return ['A', 'B', 'C']
  }

  groupsZero() {
    return this.groups().reduce((stats, group) => {
      return Object.assign({[group]: 0}, stats)
    }, {})
  }

  calcKnowPerc(words, group) {
    const know = words.filter((word) => word.know && (group === undefined || group === word.group)).length
    const total = (group === undefined ? words : words.filter((word) => word.group === group)).length
    if (total === 0) {
      return 0
    }
    return know / total
  }

  calcCountsByGroup(words) {
    return words.reduce((counts, w) => {
      if (!counts[w.group]) {
        counts[w.group] = 0
      }
      counts[w.group] += 1
      return counts
    }, this.groupsZero())
  }

  calcResults(sample) {
    const all = this.props.words

    const allCounts = this.calcCountsByGroup(all)

    const sampleCounts = this.calcCountsByGroup(sample)

    const sampleKnowPercByGroup = this.groups().reduce((stats, group) => {
      return Object.assign(stats, {[group]: this.calcKnowPerc(sample, group)})
    }, {})

    const allKnowCountByGroup = this.groups().reduce((stats, group) => {
      return Object.assign(stats, {[group]: Math.round(sampleKnowPercByGroup[group] * allCounts[group])})
    }, {})

    const allKnowCount = this.groups().reduce((count, group) => {
      return count + allKnowCountByGroup[group]
    }, 0)

    return {
      allCounts,
      sampleCounts,
      sampleKnowPercByGroup,
      allKnowCountByGroup,
      allKnowCount,
    }
  }

  render() {
    const {defaultSampleSize, availableSampleSizes} = this.props
    const {candidates, sampleSize} = this.state
    const sample = candidates.slice(0, sampleSize)

    const sampleSizeSelect = (
      <FormGroup>
        <ControlLabel>Sample Size</ControlLabel>
        <FormControl
          componentClass="select"
          style={{width: "10em"}}
          value={sampleSize}
          onChange={this.onSampleSizeChange}
        >
          {
            availableSampleSizes.map((step) => {
              return (
                <option key={step} value={step}>{step}</option>
              )
            })
          }
        </FormControl>
      </FormGroup>
    )

    const results = this.calcResults(sample)
    const resultBreakdown = (group) => {
      return (
        <li key={group}>
          <strong>Group {group}:</strong>&nbsp;
          {results.allKnowCountByGroup[group]} words =&nbsp;
          {Math.round(results.sampleKnowPercByGroup[group]*100)}% of sample *&nbsp;
          {results.allCounts[group]} total words
        </li>
      )
    }

    return (
      <div>
        <Row>
          <Col xs={11} md={10}>
            &nbsp;
            <Jumbotron>
              <h1>How Many Korean Words Do You Know?</h1>
              <p>
                This is a quiz based on a random sample from the <a href="https://ko.wiktionary.org/wiki/%EB%B6%80%EB%A1%9D:%EC%9E%90%EC%A3%BC_%EC%93%B0%EC%9D%B4%EB%8A%94_%ED%95%9C%EA%B5%AD%EC%96%B4_%EB%82%B1%EB%A7%90_5800">list of the most common Korean words</a> published by the <a href="https://www.korean.go.kr/front_eng/main.do">The National Institute of The Korean Language</a>. For each word below, select if you know the word or not. Click on the word to see it in the dictionary to check yourself. See your result at the bottom.
              </p>
              <p>
                Please note that this is mostly just for fun and probably not that accurate, but it should give Korean learners a ballpark figure of how many words they know. The sample size can be adjusted at any time during the quiz using the control below. It defaults to {defaultSampleSize} words; however, it can be increased to improve accuracy or decreased to save time.
              </p>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col xs={10} sm={8} md={6}>
            {sampleSizeSelect}
            <WordTable words={sample}/>
            <hr/>
          </Col>
        </Row>

        <Row>
          <Col xs={11} md={10}>
            <h3>Results</h3>
            <h1>{results.allKnowCount} words</h1>
            <p>
              The words are broken down into groups A, B, C from easiest to hardest.
              Hover over the words to see their group designation.
              Based on the sample above, here is how many you know in each group:
            </p>
            <ul>
              {
                this.groups().map(resultBreakdown)
              }
            </ul>
            <p>
              Results seem inaccurate? Try increasing the sample size:
            </p>
            {sampleSizeSelect}
            <p>
              Refresh the page to try another random sample.
              Share your results with a friend!
            </p>
            <div className="a2a_kit a2a_kit_size_24 a2a_default_style">
              {/* eslint-disable */}
              <a className="a2a_button_facebook"></a>
              <a className="a2a_button_twitter"></a>
              <a className="a2a_button_reddit"></a>
              <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
              {/* eslint-enable */}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WordQuiz;
