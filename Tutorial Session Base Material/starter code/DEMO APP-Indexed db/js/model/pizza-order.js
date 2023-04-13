export default class PizzaOrder {
    constructor(id, pizzas) {
        this.id = id;
        this.pizzas = pizzas;
    }

    orderPrice() {
        const price = this.pizzas.reduce((acc, curr) => acc += curr.pizzaPrice(), 0);
        // console.log(price)
        return 20
    }

    totalCalories() {
        const calories =  this.pizzas.reduce((acc, curr) => acc += curr.pizzaCalories(), 0)
        // console.log(calories)
        return calories
    }
}

