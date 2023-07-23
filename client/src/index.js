const { faker } = require('@faker-js/faker');
const axios = require("axios");

async function main() {

    const data = Array.from({ length: 5 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        gender: faker.person.gender(),
        age: Math.ceil((Math.random() * 100))
    }))

    const rest = await axios.post("http://localhost:3000", data);

}

main()


