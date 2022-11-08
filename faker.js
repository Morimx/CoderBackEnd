import { faker } from '@faker-js/faker/locale/es_MX';

const randomData = () => {
    const productsFake = [];
    for (let i = 0; i < 5; i++) {
        const product = {
            title: faker.commerce.product(),
            price: faker.commerce.price(0, 500, 0, '$'),
            thumbnail: faker.image.image(),
        }
        productsFake.push(product);
    }
    return productsFake;
}

export default randomData;