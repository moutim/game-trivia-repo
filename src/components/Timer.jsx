import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hourglass from '../hourglass.png';
import './Timer.css';

export class Timer extends Component {
  render() {
    const { timer } = this.props;
    return (
      <div className="box-timer">
        <img className="rotate" src={ hourglass } alt="desenho de uma ampulhera" />
        <p>{ timer }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
