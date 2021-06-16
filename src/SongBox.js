import React, { Component } from 'react';
import { ReactVideo,YoutubePlayer } from "reactjs-media";

class SongBox extends Component {
    render() {
        const post=this.props.post;
        return (
            <div className="songbox" style={{backgroundColor:"skyblue"}}>
                <div className="video-left" >
                <ReactVideo
                className="video-play"
                src={post.video}
                poster={post.thumbnail}
                />

                </div>
                <div className="video-right" >
                    <span style={{marginLeft:"13px",fontSize:"20px",display:"inline-block"}}>Movie Name : {post.movieName}</span>
                    <span style={{marginLeft:"13px",fontSize:"20px",display:"inline-block"}}>Language : {post.language}</span>
                    <span style={{marginLeft:"13px",fontSize:"20px",display:"inline-block",color:"red"}}>Release Date : {post.releaseDate}</span>
                </div>
                
            </div>
        );
    }
}

export default SongBox;