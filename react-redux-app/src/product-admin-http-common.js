import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44309/api/Admin",
    headers: {
        "Content-type": "application/json"
    }
});