import http from "../http-common";

class RentService {
  borrow(data) {
    const token = localStorage.getItem('accessToken'); // Get the token from localStorage
    return http.post("/borrows", data, { headers: { 'x-access-token': token } });
  }
}

export default new RentService();