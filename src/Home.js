import React, { Component } from 'react';
import { ReactVideo,YoutubePlayer } from "reactjs-media";
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import SongBox from './SongBox';
class Home extends Component {
    render() {
        //console.log('home props',this.props);
        //this.props.fetch();
        const data=this.props.store.getState();
        //console.log('home prop data',data);
        return (
            <div>
                <Link to="/upload" style={{fontSize:"30px",color:"hsl(357, 96%, 50%)"}}>Upload Here</Link>
                
                {
                    data.map(post=>(
                        <SongBox post={post} />
                    ))
                }
            </div>
        );
    }
}

export default Home;