import React, { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Delta extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    delta: PropTypes.number.isRequired
  };

  shouldComponentUpdate = shallowCompare;

  render() {
    return (
      <div className={`widget--delta widget--delta-${this.props.delta}`}>
        {[(
          <div key="widget" className="widget--widget">{this.props.children[0]}</div>
        ), (this.props.children[1] ? (
          <div key="options" className="widget--options">{this.props.children[1]}</div>
        ) : null)]}
      </div>
    );
  }
}
