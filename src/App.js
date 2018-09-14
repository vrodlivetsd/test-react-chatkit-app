import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator} from './chatkit-config'

import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'jinn',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.currentUser.subscribeToRoom({
          roomId: 15481261,
          messageLimit: 10,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        })
      })
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: 15481261
    })
  }

  render() {
    console.log('this.state.messages', this.state.messages)
    return (
       <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
                <NewRoomForm />
            </div>
    );
  }
}

export default App;
