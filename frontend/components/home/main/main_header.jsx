import React from 'react';
import { withRouter } from 'react-router';
import Spinner from '../../spinner';
class MainHeader extends React.Component {
  constructor(props){
    super(props);
    this.toggleDetailView = this.toggleDetailView.bind(this);
  }

  componentWillMount(){
    const channelId = this.props.match.params.channelId;
  }

  componentWillReceiveProps(newProps){
    if (newProps.match.params.channelId !== this.props.match.params.channelId && newProps.notifications > 0 ) {
      const channelId = newProps.match.params.channelId;
      }
  }

  toggleDetailView() {
      let detailLink;
      let channelId = this.props.match.params.channelId;
      detailLink = `/messages/${channelId}/details`;
      if (this.props.location.pathname.endsWith("details")) {
        this.props.history.push(`/messages/${channelId}`);
      } else {
        this.props.history.push(detailLink);
      }
  }

  render(){
    if (this.props.channel === undefined) return <Spinner />;

    let channelName = "#" + this.props.channel.name;
    let usernames = [];
    if (this.props.channel.private === true ) {
      for (var i = 0; i < this.props.channel.users.length; i++) {
        let user = this.props.channel.users[i];
        if (user.username === this.props.user.username && this.props.channel.users.length !== 1) {
          continue;
        }
        usernames.push(user.username);
      }
      usernames[0] = "@" + usernames[0];
      channelName = usernames.join(",  ");
    }
      return (
        <header id="main-team-header">
          <div id="main-header-content">
            {channelName}
            <br />
            <span id="detail-view-toggle" onClick={this.toggleDetailView}>
              <i id="channel-count-of-users" className="fa fa-user-o" aria-hidden="true"></i>
              <span id="channel-count-of-users" >{this.props.channel.userCount}</span>
            </span>
          </div>
        </header>
      );
  }

}

export default withRouter(MainHeader);
