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
  rating: number;
}

export type Users = User[];

export enum Filters {
  Name = "fullname",
  Login = "login",
  Email = "email",
  Phone = "phone",
  Rating = "rating",
}

export enum Details {
  Name = "fullname",
  Email = "email",
  Phone = "phone",
  Age = "age",
  Address = "address",
  Password = "password",
}

export interface UserRating {
  id: string;
  rating: number;
}

export type UserRatings = UserRating[];
