import React from 'react';
import { withRouter } from 'react-router-dom';
import NewMessageForm from './new_message';
class ChatList extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const channelId = this.props.match.params.channelId;
    this.props.fetchMessages(channelId);
  }

  render(){
    const messages = this.props.messages.map((message) => (
      <li className="chat-message">
        <div className="all-message-content">
          <img src={message.user.avatar_url} />
          <div className="message-content">
            {message.user.username} <span id="message-time">{message.created_at}</span>
            <br />
            {message.content}
          </div>
        </div>
      </li>
    ));
      return (
        <section className="all-messages-container">
          <ul className="chat-message-list">
            { messages }
          </ul>
          <footer id="new-message-footer">
            <NewMessageForm channel={this.props.channel} />
          </footer>
        </section>
      );
  }

}

export default withRouter(ChatList);
