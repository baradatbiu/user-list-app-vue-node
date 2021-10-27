import http from "@/http-common";

type Payload = {
  userId: string;
};

class UserService {
  getAll(): Promise<any> {
    return http.get("/users");
  }

  get({ userId }: Payload): Promise<any> {
    return http.get(`/users/${userId}`);
  }

  delete({ userId }: Payload): Promise<any> {
    return http.delete(`/users/${userId}`);
  }
}

export default new UserService();
