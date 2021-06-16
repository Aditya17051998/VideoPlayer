import React, { Component,useState,useEffect } from 'react';
import { useHistory } from 'react-router'

const Upload=(props)=>  {
    const [title,setTitle]=useState("")
    const [year,setYear]=useState("")
    const [image,setImage]=useState("")
    const [language,setLanguage]=useState("")
    const [video,setVideo]=useState("")
    const [imagedata,setImagedata]=useState("")
    const [videodata,setVideodata]=useState("")
    const [wait,setWait]=useState("");
    const history=useHistory();

    useEffect(()=>{
        if(imagedata  && videodata){
            //console.log('hook',imagedata,videodata);
            fetch("https://backendvideoplayer.herokuapp.com/upload",{
            method:"Post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                movieName:title,
                releaseDate:year,
                thumbnail:imagedata,
                language,
                video:videodata
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            history.push('/');
            console.log(data);
            props.fetch();
        })
        }
    },[imagedata,videodata])

    const handleImage=()=>{
        const data=new FormData();
        //console.log("image",image)
        data.append("file",image)
        //data.append("file",video)
        data.append("upload_preset","instaClone")
        data.append("cloud_name","aditya-foundation")
        fetch("https://api.cloudinary.com/v1_1/aditya-foundation/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            //////////// you can use both the login by using useeffect
            //console.log('image',data.url);
            setImagedata(data.url)
            //fetchAPI(data.url);
        })
        .catch(err=>{
            console.log(err)
        })
        


    }
    const handleVideo=()=>{
        const data=new FormData();
        //console.log("video",video)
        data.append("file",video)
        data.append("upload_preset","instaClone")
        data.append("cloud_name","aditya-foundation")
        fetch("https://api.cloudinary.com/v1_1/aditya-foundation/video/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            //////////// you can use both the login by using useeffect
            //console.log('video',data);
            setVideodata(data.url);
            //fetchAPI(data.url);
        })
        .catch(err=>{
            console.log(err)
        })
        


    }

    const handleSubmit= async ()=>{
        console.log(image.type);
        console.log(image);
        if(title && image && language && video && year && (image.type=== "image/jpeg")){
        setWait("Please Wait while Uploading");
        await handleImage();
        await handleVideo();
        }else{
            alert("Please provide all property with proper formate");
            setWait("")
            setTitle("");
            setLanguage("");
            setYear("");
            
        }
        
        

    }
    
    

    return (
        <div style={{backgroundColor:"#48968f",height:"100vh",width:"100vw",padding:"3vh"}}>
            <div style={{width:'77vw',height:"10vh",margin:"auto",fontSize:"30px",color:'#fc030f',backgroundColor:"slateblue"}}><span>Upload Your Video Here</span></div>
            <div style={{margin:"auto",height:"50vh",width:"70vw",backgroundColor:'#03e3fc',padding:"6vh"}}>
            <div style={{height:"9%"}}>
                {/* <span style={{marginRight:"10vw"}}>Name of Movie</span> */}
                <input className="inputbox" type="text" placeholder="SongName" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
            </div>
            <div style={{height:"9%"}}>
                {/* <span style={{marginRight:"15vw"}}>Year</span> */}
                <input className="inputbox" type="text" value={year} placeholder="year" onChange={(e)=>setYear(e.target.value)} required/>
            </div>
            <div >
                <span style={{color:"red"}}>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} required/>
            </div>
            <div style={{height:"9%"}}>
                {/* <span style={{marginRight:"12vw"}}>Language</span> */}
                <input className="inputbox" type="text" value={language} placeholder="language" onChange={(e)=>setLanguage(e.target.value)} required/>
            </div>
            <div style={{height:"9%"}}>
                <span style={{color:"red"}}>Upload video</span>
                <input type="file" onChange={(e)=>setVideo(e.target.files[0])} required/>
            </div>
           
            <button onClick={handleSubmit} style={{color:"green",height:"12%",width:"10vw",fontSize:"100%",marginBottom:"10vh"}}>Upload</button>
            {wait && (<div style={{fontSize:"30px",color:"red"}}>
                {wait}
            </div>)}
            </div>
            
            
            
        </div>
        
    )
    
}

export default Upload;
