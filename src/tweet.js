function Tweet(props) {
    return (
    <div className='tweet-container'>
        <div className='user'>{props.user}</div>
        <div className='message'>{props.message}</div>
    </div>
);
}
  
export default Tweet;