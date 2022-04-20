





const DisplayVideo = (props) => {
  

  return (
    props.sorceProp.map((video, index) => {
      return(

        <iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/watch?v=aNAkWnqaZNo`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
    })
  );
};

export default DisplayVideo;
