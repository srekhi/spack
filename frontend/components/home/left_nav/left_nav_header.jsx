import React from 'react';
import { Redirect, hashHistory } from 'react-router';
class LeftNavHeader extends React.Component {
  constructor(props){
    super(props);
    this.username = this.props.username;
    this.logout = this.props.logout;
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser() {
    this.logout();
  }

  render() {
    return (
      <section id="company-header">
        <h2 id="company-name"><b>Splat</b></h2>
        <i id="fa-bars-dropdown" onClick={this.logoutUser} className="fa fa-bars" aria-hidden="true"></i>
        <div id ="left-nav-username-display">
          <div id="online-marker"></div>
          <p id="current-user-name">{this.username}</p>
        </div>
      </section>
    );
  }
}

export default LeftNavHeader;