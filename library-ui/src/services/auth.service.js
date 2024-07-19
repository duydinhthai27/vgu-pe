import http from "../http-common";

class AuthDataService {
  register(data) {
    return http.post("/auth/register", data);
  }
  login(data) {
    return http.post("/auth/login", data);
  }
}

export default new AuthDataService();