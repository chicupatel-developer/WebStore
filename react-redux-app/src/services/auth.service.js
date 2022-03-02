import http from "../auth-http-common";

class AuthService {
  
    register = async (data, myRole) => {
        return await http.post(`/register/${myRole}`, data);
    }

    login = async (data) => {
        return await http.post(`/login`, data);
    }
}
export default new AuthService();