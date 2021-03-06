import React from 'react';
import { Link } from 'react-router-dom';

class UserSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.profilePhoto = this.profilePhoto.bind(this);
  }

  hideResults() {
    $('#user-search').addClass('hidden');
  }

  handleInput(e) {
    $('#user-search').removeClass('hidden');
    $(document).on('click', this.hideResults);
    this.setState({ results: [] })
    const { users } = this.props
    this.setState({ query: e.currentTarget.value })
    const userResults = users.filter(user => user.username.includes(this.state.query));
    this.setState({ results: userResults })
  }

  profilePhoto(user) {
    if (user.profilePhotoUrl !== "/api/users") {
      return (
        <img className="tiny-profile-pic" src={user.profilePhotoUrl} />
      )
    } else {
      return (
        <img className="tiny-profile-pic" src={window.defaultProfilePicURL} />
      )
    }
  }

  renderResults() {
    const userItems = this.state.results.map(user => (
      <li key={user.id} className="search-result-item">
        <Link to={`/users/${user.id}/`} className="user-link">
          {this.profilePhoto(user)}
          <div>
            <h2 className="search-username bold">{user.username}</h2>
            <h2 className="search-name">{user.name}</h2>
          </div>
        </Link>
      </li>
    ));

    return (
      <ul>
        {userItems}
      </ul>
    )
  }

  render() {
    return (
      <div className="search-container">
        <div className="search">
          <span className="fa fa-search"></span>
          <input
            type="text"
            placeholder="Search"
            value={this.state.query}
            onChange={this.handleInput}
          >
          </input>
        </div>
        <div id="user-search" className="search-results hidden">
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

export default UserSearch
