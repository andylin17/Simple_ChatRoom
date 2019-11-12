import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Messager extends Component {
    static displayName = Messager.name;


  render() {
    const { src, name, content, time, handleMessagerChange } = this.props;
    return (
      <li className="thread-item" onClick={handleMessagerChange}>
          <div className="clearfix">
                <div className="thread-item_left">
                    <img className="img-circle" src={src} alt="" className="img" style={{ height: '50px', width:'50px' }} />
            </div>
            <div className="thread-item_right">
              <div className="thread-from">
                {name}
              </div>
              <div>
                <span className="thread-content">{content}</span>
              </div>
              <span className="thread-time">{time}</span>
            </div>
          </div>
      </li>
    );
    }
}
    Messager.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    handleMessagerChange: PropTypes.func.isRequired
  }