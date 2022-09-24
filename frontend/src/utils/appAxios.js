import axios from "axios";

const appAxios = axios.create({
    baseURL:'http://localhost:5016',
})

export default appAxios

//TODO: bonda degistir ve axios ile baglanti kur baseUrl