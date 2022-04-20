





const DisplayVideo = (props) => {
  

  return (
    <iframe id="player" type="text/html" width="640" height="390"
  src={`http://www.youtube.com/embed/${props.videoId}?enablejsapi=1&origin=http://example.com`}
  frameBorder="0" title={props.title}></iframe>
      )
};

export default DisplayVideo;
