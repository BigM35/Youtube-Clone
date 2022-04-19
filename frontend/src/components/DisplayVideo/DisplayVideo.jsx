import SearchBar from "../SearchPage/SearchBar";
import { useNavigate } from "react-router-dom";

const DisplayVideo = (props) => {
  const navigate = useNavigate();
  navigate("/videopage");

  return (
    <iframe
      width="560"
      height="315"
      src={props.videoProps}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  );
};

export default DisplayVideo;
