export type Result = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};

export interface User {
  fullname: string;
  email: string;
  id: string;
  login: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export type Users = User[];

export enum Filters {
  Name = "fullname",
  Login = "login",
  Email = "email",
  Phone = "phone",
}
