import https from "https";

const numberOfUsers = 7;
const includingFields = [
  "name",
  "email",
  "login",
  "phone",
  "picture",
  "dob",
  "location",
];

const options = {
  hostname: "randomuser.me",
  path: `/api/?results=${numberOfUsers}&inc=${includingFields.join(
    ","
  )}&noinfo`,
};

export const fetchRandomUsers = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        const data = JSON.parse(body);

        if (data.error) reject(data);

        const users = updatedUsers(data.results);

        resolve(users);
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};

function updatedUsers(users) {
  return users.map((user) => {
    const {
      name: { first, last },
      email,
      login: { uuid: id, username: login, password },
      phone,
      picture,
      location: {
        street: { name: street },
        city,
        postcode,
      },
      dob: { age },
    } = user;

    return {
      fullname: `${first} ${last}`,
      email,
      id,
      login,
      phone,
      picture,
      age,
      address: `${postcode} ${city} ${street}`,
      password,
    };
  });
}
