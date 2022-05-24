import http from "@/http-common";
import { Users, User } from "@/types/user";

type Payload = {
  userId: number;
};

class UserService {
  getAll(): Promise<{ data: Users }> {
    return http.get("/users");
  }

  get({ userId }: Payload): Promise<{ data: User }> {
    return http.get(`/users/${userId}`);
  }

  delete({ userId }: Payload): Promise<void> {
    return http.delete(`/users/${userId}`);
  }
}

export default new UserService();
