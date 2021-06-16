import axios from 'axios';
const fetchData=async ()=> {
    var data=await axios.get("http://localhost:5000/");
    return {type:"fetch",data:data};
  }
export default fetchData;