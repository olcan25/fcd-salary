import axios from "axios";

const appAxios = axios.create({
    baseURL:'https://localhost:7044',
})

export default appAxios