// clase donde importamos e implementamos axios
import axios from "axios";

const customFetch = axios.create({
    baseURL: '/api/v1',   // esta sera la base de la url
});


// 
export default customFetch;