import React, { Component, } from 'react';
import PropTypes from 'prop-types';

export default class UserInput extends Component {

  render() {
    const { newMessage, messageChange, handleKeyDown} = this.props;
    return (
      <input className="new-message"
             value={newMessage}
             onChange={messageChange}
             onKeyDown={handleKeyDown} />
    );
  }
}
UserInput.propTypes = {
  messageChange: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  newMessage: PropTypes.string.isRequired
}