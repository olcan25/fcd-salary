import axios from "axios";

const appAxios = axios.create({
    baseURL:'http://localhost:90',
})

export default appAxios

//TODO: bonda degistir ve axios ile baglanti kur baseUrl