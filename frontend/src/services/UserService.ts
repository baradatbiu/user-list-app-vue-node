import http from "@/http-common";

class UserService {
  getAll(): Promise<any> {
    return http.get("/users");
  }
}

export default new UserService();
