import React, { Component, } from 'react';
import PropTypes from 'prop-types';

export default class MessageItem extends Component {
    static displayName = MessageItem.name;
    constructor(props) {
        super(props)
    }

  render() {
    const { from, text} = this.props;
      return (
          <div className={`message-item ${from == sessionStorage.getItem("user") ? 'message-from-me' : 'message-from-other'}`}>
        <span>{text}</span>
      </div>
    );
  }
}

MessageItem.propTypes = {
    from: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}