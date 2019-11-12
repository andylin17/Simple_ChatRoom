import React, { Component } from 'react';
import MessageList from './MessageList';
import Messager from './Messager';
import UserInput from './UserInput';
import SearchModal from './SearchModal';

const initialState = {
    newMessage: '',
    threads: [
        {
            target: {
                name: '',
                profilePic: ''
            },
            messages: [
                {
                    from: '',
                    text: '',
                    time: new Date().toDateString()
                }
            ]
        }
    ],
    currentIndex: 0
};
var aaa = [];
var user = "";
var pic = '';

export default class Chat extends Component {
    static displayName = Chat.name;

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleMessageChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleMessagerChange(event) {
    this.setState({ currentIndex: event });
  }

  handleKeyDown(event) {
    const message = event.target.value;
    const time = new Date().toDateString();
      const addMessage = { from: user, text: message, time: time};

    if (event.keyCode === 13 && message !== '') {
      const {threads, currentIndex} = this.state;
        threads[currentIndex].messages.push(addMessage);
        this.Postdata(addMessage);
      this.setState({
        newMessage: '',
        threads: threads
      });
    }
    }

    componentWillMount() {
        this.initialdata(); 
    }

  render() {
      const { threads, currentIndex } = this.state;
      const han = () => { this.initialdata(); }
      var friend = '';
      if (threads[currentIndex].target != null)
          friend = threads[currentIndex].target.name;
    return (
      <div className="chat-app clearfix">
        <div className="chat-app_left">
          <div className="heading">
            <span className="messenger-title">Messager</span>
                    <SearchModal refresh={han}/>
          </div>
          <div className="thread-list">
            {threads.map((thread, id) => {
              const { target, messages } = thread;
                const lastMessage = messages[messages.length - 1] == null ? "" : messages[messages.length - 1];
                const time = new Date(lastMessage.time == null ? Date.now() : lastMessage.time).toDateString();
              return (
                <Messager
                  key={id}
                  src={target.profilePic}
                  name={target.name}
                  content={lastMessage.text}
                  time={time}
                  handleMessagerChange={this.handleMessagerChange.bind(this, id)}
                />
              );
            })}
          </div>
        </div>
        <div className="chat-app_right">
          <div className="heading">
                <div className="current-target">{friend}</div>
          </div>
          <div className="message-list">
            <MessageList threads={threads} index={currentIndex} />
          </div>
          <div className="footer">
            <UserInput newMessage={this.state.newMessage}
                       messageChange={this.handleMessageChange.bind(this)}
                       handleKeyDown={this.handleKeyDown.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

    async initialdata() {
        user = sessionStorage.getItem("user");
        const response = await fetch('Dialog/' + user);
        const json = await response.json();
        aaa = json;
        this.setdata();
    }
    Postdata(addMessage) {
        function replacer(key, value) {
            // Filtering out properties
            return value;
        }
        const { currentIndex } = this.state;
        const context = {
            method: "post", headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(aaa[currentIndex], replacer)
        }
        const res = fetch('Dialog/' + aaa[currentIndex].id, context);
    }
    async setdata() {
        var name = '';
        var messages = [];
        var target = [];
        var temp = [];
        const { threads } = this.state;
        if (!aaa.length > 0)
            temp = threads;
        for (var i = 0; i < aaa.length; i++)
        {
            if (aaa[i].user_A == user) {
                name = aaa[i].user_B;
            }
            else {
                name = aaa[i].user_A;
            }
            await this.getpic(name);
            messages = aaa[i].messagelist;
            target = {
                name, profilePic: process.env.PUBLIC_URL + '/Image/' + pic
            };
            temp.push({ target, messages, currentIndex: i });
        }
        this.setState({ threads: temp });
    }
    
    async getpic(name) {
        await fetch('Loginfo/' + name).then(res => res.json())
        .then(data => {
            pic = data.Picture;
        });
    }
}
