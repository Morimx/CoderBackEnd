import CRUDFireBase from "../../containers/contenedorFireBase.js";

class daoFirebase extends CRUDFireBase {
    constructor() {
        super("products");
    }
    async deleteCartItem(cartId, itemId) {
        try {
            const cart = await this.readById(cartId);
            const newCart = cart.items.filter((item) => item.id !== itemId);
            await this.update(cartId, { items: newCart });
        } catch (err) {
            console.log(err);
        }
    }

    async addCartItem(cartId, item) {
        try {
            const cart = await this.readById(cartId);
            const newCart = [...cart.items, item];
            await this.update(cartId, { items: newCart });
        } catch (err) {
            console.log(err);
        }
    }
}

export default daoFirebase;