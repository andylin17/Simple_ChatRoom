import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

export default class MessageList extends Component {
    static displayName = MessageList.name;


  render() {
    const { threads, index } = this.props;
    const messages = threads[index].messages;
    return (
      <div>
        {messages.map((message, id) => {
          return (
            <MessageItem key={id}
                         from={message.from}
                         text={message.text} />
          );
        })}
      </div>
    );
  }
}
MessageList.propTypes = {
    threads: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired
}