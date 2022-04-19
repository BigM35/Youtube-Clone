



const DisplayVideos = (props) => {
    return ( 
        props.videos.map(
            (video, index) => {
                return(
                    <form>
                        <label>{props.video}</label>
                        <label>{props.video.items.id.video_id}</label>

                    </form>
                )
            }
        )
    )
}
 
export default DisplayVideos;