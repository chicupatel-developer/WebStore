import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44309/api/Shopper",
    headers: {
        "Content-type": "application/json"
    }
});