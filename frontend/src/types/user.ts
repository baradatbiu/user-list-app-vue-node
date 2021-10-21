export type Result = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    street: { name: string };
    city: string;
    postcode: string;
  };
  dob: {
    age: number;
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
  age: number;
  address: string;
  password: string;
}

export type Users = User[];

export enum Filters {
  Name = "fullname",
  Login = "login",
  Email = "email",
  Phone = "phone",
}

export enum Details {
  Name = "fullname",
  Email = "email",
  Phone = "phone",
  Age = "age",
  Address = "address",
  Password = "password",
}
