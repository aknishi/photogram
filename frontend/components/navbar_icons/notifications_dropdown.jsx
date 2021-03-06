import React from 'react';
import { Link } from 'react-router-dom';

class NotificationsDropdown extends React.Component {
  constructor(props){
    super(props);
    this.profilePhoto = this.profilePhoto.bind(this);
  }

  profilePhoto(user) {
    if (user.profilePhotoUrl !== "/api/users") {
      return(
        <img className="tiny-profile-pic" src={user.profilePhotoUrl}/>
      )
    } else {
      return(
        <img className="tiny-profile-pic" src={window.defaultProfilePicURL}/>
      )
    }
  }

  render() {
    const { notifications, users, posts, currentUser } = this.props
    let notificationItems = [];
    if (Object.keys(posts).length !== 0 && notifications.length !== 0) {
      notificationItems = notifications.slice(0).reverse().map(
        notification => {
          switch(notification.notification_type) {
            case "comment":
            return(
              <li key={notification.id}>
                <Link to={`/users/posts/${notification.post_id}`} className="notification-item">
                  <div className="notification-body">
                    { this.profilePhoto(users[notification.creator_id]) }
                    <h4><b>{users[notification.creator_id].username}</b> commented on your photo</h4>
                    <h4 className="time-ago">{notification.time_ago} ago</h4>
                  </div>
                  <img className="notification-photo" src={posts[notification.post_id].photoUrl}/>
                </Link>
              </li>
            )
            case "like":
            return(
              <li key={notification.id}>
                <Link to={`/users/posts/${notification.post_id}`} className="notification-item">
                  <div className="notification-body">
                    { this.profilePhoto(users[notification.creator_id]) }
                    <h4><b>{users[notification.creator_id].username}</b> liked your photo</h4>
                    <h4 className="time-ago">{notification.time_ago} ago</h4>
                  </div>
                  <img className="notification-photo" src={posts[notification.post_id].photoUrl}/>
                </Link>
              </li>
            )
            case "bookmark":
            return(
              <li key={notification.id}>
                <Link to={`/users/posts/${notification.post_id}`} className="notification-item">
                  <div className="notification-body">
                    { this.profilePhoto(users[notification.creator_id]) }
                    <h4><b>{users[notification.creator_id].username}</b> bookmarked your photo</h4>
                    <h4 className="time-ago">{notification.time_ago} ago</h4>
                  </div>
                  <img className="notification-photo" src={posts[notification.post_id].photoUrl}/>
                </Link>
              </li>
            )
            case "follow":
            return(
              <li key={notification.id}>
                <Link to={`/users/${notification.creator_id}`} className="notification-item">
                  <div className="notification-body">
                    { this.profilePhoto(users[notification.creator_id]) }
                    <h4><b>{users[notification.creator_id].username}</b> started following you</h4>
                    <h4 className="time-ago">{notification.time_ago} ago</h4>
                  </div>
                </Link>
              </li>
            )
          }
        })
      }
    if (notificationItems.length === 0){
      notificationItems.push(
        <li key="none" id="no-notifications" className="notification-item">
          <h4>You have no notifications</h4>
        </li>)
      }

    if (Object.keys(posts).length !== 0) {
      return(
        <ul id="notifications-dropdown" className="notifications-dropdown hidden">
          { notificationItems }
        </ul>
      )
    } else {
      return(
        <ul></ul>
      )
    }
  }
}

export default NotificationsDropdown;
