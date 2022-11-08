import { faker } from "@faker-js/faker/locale/es_MX";


const randomMessage = (cantidad) => {
    const messagesFake = [];
    for (let i = 0; i < cantidad; i++) {
        const message = {
            email: faker.internet.email(),
            msg: faker.lorem.sentence(),
            date: faker.date.past(),
            name: faker.name.firstName(),
            apellido: faker.name.lastName(),
            alias: faker.internet.userName(),
            avatar: faker.image.avatar(),
            edad: faker.datatype.number({ max: 100 }),
        };
        messagesFake.push(message);
    }
    return messagesFake;
}

export default randomMessage;