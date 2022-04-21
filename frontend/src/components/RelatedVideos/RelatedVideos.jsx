import React, { useEffect, useState } from "react";
import axios from "axios";

function SuggestedVideos() {
  const [videos, setVideos] = useState([]);

  async function fetchRelatedVideos(props) {
    let response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${props.searchTerm}&type=video&key=${props.token}&type=video&part=snippet`
    );
    setVideos(response.data.items);
  }

  console.log(videos);
  useEffect(() => {
    fetchRelatedVideos();
  });

  return (
    <div className="suggestedVideos_videos">
      {videos.map((video, index) => {
        return (
          <>
            <iframe
              id="player"
              type="text/html"
              width="640"
              height="390"
              src={`http://www.youtube.com/embed/${props.videoId}?enablejsapi=1&origin=http://example.com`}
              frameBorder="0"
              title={props.title}
            ></iframe>
            <video
              key={index}
              image={video.snippet.thumbnails.high.url}
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
              video_id={video.id}
              uploadDate={video.snippet.publishedAt}
              suggest={true}
            />
          </>
        );
      })}
    </div>
  );
}
export default SuggestedVideos;
