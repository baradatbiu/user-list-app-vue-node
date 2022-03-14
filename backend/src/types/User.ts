export interface FetchedUserDetails {
  name: {
    first: string;
    last: string;
  };
  location: {
    street: string;
    city: string;
    postcode: string;
  };
  email: string;
  login: {
    username: string;
    password: string;
  };
  phone: string;
  picture: {
    large: string;
  };
  dob: {
    age: number;
  };
}

export interface UserDetails {
  id?: number;
  fullname: string;
  address: string;
  email: string;
  login: string;
  password: string;
  phone: string;
  picture: string;
  age: number;
  rating: number;
}
