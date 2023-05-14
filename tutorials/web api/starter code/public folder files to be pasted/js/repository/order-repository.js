// import PizzaOrder from "../model/pizza-order.js";
// import Pizza from "../model/pizza.js";
// const pizzaOrder = new PizzaOrder()
// const db = new Localbase('my-pizzas.db')

// export default class OrderRepository {
//     async initDB() {
//         //either it exists or it doesnt
//         const order = await db.collection('orders').get()

//         if (order.length > 0) {
//             console.log('Database already initialized')
//         } else {
//             //we need to first read the json and populate our collection
//             const data = await fetch('../data/orders.json')
//             const orders = await data.json()
//             for (const order of orders)
//                 await db.collection('orders').add(order)
//         }
//     }

//     async addOrder(order) {
//         return await db.collection('orders').add(order)
//     }

//     async updateOrder(updatedOrder) {
//         return await db.collection('orders')
//             .doc({ id: updatedOrder.id }).update(updatedOrder)
//     }

//     async deleteOrder(id) {
//         return await db.collection('orders').doc({ id }).delete()
//     }

//     async getOrder(id) {
//         const order = await db.collection('orders').doc({ id }).get()
//         if (order)
//             Object.setPrototypeOf(order, PizzaOrder.prototype)

//         return order
//     }

//     async getOrders() {
//         const orders = await db.collection('orders').get()
//         for (let order of orders) {
//             for (const pizza of order.pizzas) {
//                 Object.setPrototypeOf(pizza, Pizza.prototype)
//             }
//             Object.setPrototypeOf(order, PizzaOrder.prototype)
//         }
//         return orders
//     }

//     async getPizza(orderId, pizzaId) {
//         const order = await this.getOrder(orderId)
//         return order.pizzas.find(pizza => pizza.id == pizzaId)
//     }

//     async deletePizza(orderId, pizzaId) {
//         const order = await this.getOrder(orderId)

//         const index = order.pizzas.findIndex(pizza => pizza.id == pizzaId)
//         if (index >= 0) {
//             order.pizzas.splice(index, 1)
//             await this.updateOrder(order)
//         }
//     }
// }

