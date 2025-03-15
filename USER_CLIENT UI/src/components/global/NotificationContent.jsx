import '../../styles/NotificationContent.css';

const NotificationContent = ({ notifications, onMarkRead, onDelete }) => {
    if (!notifications || notifications.length === 0) {
      return <p>No notifications available.</p>;
    }
  
    return (
      <div className="notification-content">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={notification.read ? "read" : "unread"}>
              <p>{notification.message}</p>
              <p><small>{new Date(notification.date).toLocaleString()}</small></p>
              <button onClick={() => onMarkRead(notification.id)}>Mark as Read</button>
              <button onClick={() => onDelete(notification.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default NotificationContent;
  