import path from 'path'
import { promises as fs } from 'fs'

const dataPath = path.join(process.cwd(), 'data/orders.json')

class OrderRepo {

    async addOrder(order) {
        const orders = await this.getOrders()
        const newOrder = {
            id: Math.max(...orders.map((pizza) => pizza.id)) + 1,
            ...order,
        }
        newOrder.pizzas = []
        orders.unshift(newOrder)
        await fs.writeFile(dataPath, JSON.stringify(orders, null, 2))
        return newOrder
    }
    async updateOrder(id, updatedOrder) {
        const orders = await this.getOrders()
        let index = orders.findIndex((order) => order.id == id)
        console.log(index);

        if (index == -1)
            return { error: `Unable to update as there is No Order with id : ${id}` }

        orders[index] = { ...orders[index], ...updatedOrder }

        await fs.writeFile(dataPath, JSON.stringify(orders, null, 2))
        return { message: `Order with id : ${id} is updated` }
    }

    async deleteOrder(id) {
        const orders = await this.getOrders()
        const index = orders.findIndex(order => order.id == id)

        if (index == -1)
            return { error: `No order with id : ${id}` }

        orders.splice(index, 1)
        await fs.writeFile(dataPath, JSON.stringify(orders, null, 2))

        return { message: `Order with id : ${id} deleted` }
    }

    async getOrders() {
        const orders = await fs.readFile(dataPath, 'utf8')
        return JSON.parse(orders)
    }

    async getOrdersById(id) {
        const orders = await this.getOrders()
        const order = orders.find((order) => order.id == id)

        if (!order)
            return { error: `No Order with id : ${id}` }

        return order
    }

    async getOrdersPizzas(orderId) {
        const order = await this.getOrdersById(orderId)
        if (!order)
            return { error: `No Order with id : ${id}` }

        return order.pizzas
    }

    async updatePizza(orderId, pizzaId, updatedPizza) {
        const order = await this.getOrdersById(orderId)

        let pizzaIndex = order.pizzas.findIndex((pizza) => pizza.id == pizzaId)

        if (pizzaIndex == -1)
            return { error: `Unable to update as there is No Pizza with id : ${id}` }

        order.pizzas[pizzaIndex] = { ...order.pizzas[pizzaIndex], ...updatedPizza }

        await this.updateOrder(orderId, order)

        return { message: `Pizza with order id : ${orderId} and pizza id : ${pizzaId} is updated` }
    }

    async addPizza(orderId, pizza) {
        const order = await this.getOrdersById(orderId)
        console.log(order.pizzas);

        if (!order)
            return { error: `No order with such is : ${orderId}` }

        const newPizza = {
            id: order.pizzas.length > 0 ? Math.max(...order.pizzas.map(p => p.id)) + 1 : 1,
            ...pizza,
        }

        // remove pizza from order
        order.pizzas.push(newPizza)
        await this.updateOrder(orderId, order)

        return newPizza
    }
    async getPizza(orderId, pizzaId) {
        const order = await this.getOrdersById(orderId)
        return order.pizzas.find(pizza => pizza.id == pizzaId)
    }

    async deletePizza(orderId, pizzaId) {

        const order = await this.getOrdersById(orderId)

        let index = order.pizzas.findIndex((pizza) => pizza.id == pizzaId)

        if (index == -1)
            return { error: `Unable to delete as there is No Pizza with id : ${pizzaId}` }
        // remove pizza from order
        order.pizzas.splice(index, 1)
        await this.updateOrder(orderId, order)
        return { message: `Pizza with id : ${pizzaId} deleted` }

    }
    // unused methods
    async deleteAllOrders() {
        // clear all the orders
        await fs.writeFile(dataPath, JSON.stringify([]))
        return { message: `All Orders are deleted` }
    }
}

export default new OrderRepo()
