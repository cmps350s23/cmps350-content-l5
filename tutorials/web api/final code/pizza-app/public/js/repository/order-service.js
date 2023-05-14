import PizzaOrder from "../model/pizza-order.js";
import Pizza from "../model/pizza.js";
const pizzaOrder = new PizzaOrder()

const BASE_URL = '/api/orders'

export default class OrderService {

    async addOrder(order) {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        return await response.json()
    }

    async updateOrder(updatedOrder) {
        const response = await fetch(`${BASE_URL}/${updatedOrder.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        })
        return await response.json()
    }

    async deleteOrder(id) {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        })
        return await response.json()
    }

    async getOrders() {
        const response = await fetch(BASE_URL)
        const orders = await response.json()
        for (let order of orders) {
            for (const pizza of order.pizzas) {
                Object.setPrototypeOf(pizza, Pizza.prototype)
            }
            Object.setPrototypeOf(order, PizzaOrder.prototype)
        }
        return orders
    }
    async getOrderPizzas(orderId) {
        const response = await fetch(`${BASE_URL}/${orderId}/pizzas`)
        const pizzas = await response.json()
        for (const pizza of pizzas) {
            Object.setPrototypeOf(pizza, Pizza.prototype)
        }
        return pizzas
    }

    async getPizza(orderId, pizzaId) {
        // use /api/orders/:id/pizzas/:pizzaId
        const response = await fetch(`${BASE_URL}/${orderId}/pizzas/${pizzaId}`)
        const pizza = await response.json()
        if (pizza)
            Object.setPrototypeOf(pizza, Pizza.prototype)

        return pizza
    }

    async addPizza(orderId, pizza) {
        const response = await fetch(`${BASE_URL}/${orderId}/pizzas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pizza)
        })
        return await response.json()
    }

    async updatePizza(orderId, pizzaId, updatedPizza) {

        const response = await fetch(`${BASE_URL}/${orderId}/pizzas/${pizzaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPizza)
        })
        return await response.json()
    }

    async deletePizza(orderId, pizzaId) {
        const response = await fetch(`${BASE_URL}/${orderId}/pizzas/${pizzaId}`, {
            method: 'DELETE'
        })
        return await response.json()
    }

}

