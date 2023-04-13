import OrderRepo from './repository/order-repository.js'
import PizzaOrder from "./model/pizza-order.js";

//we need to do this because we are using module
window.onload = async () => {
    window.deleteOrder = deleteOrder
    window.loadEditorPage = loadEditorPage
    window.displayOrders = displayOrders
    window.deletePizza = deletePizza

    await orderRepo.initDB()
    await displayOrders()
}

// const pizzaCards = document.querySelector('#pizza-cards')
const ordersElement= document.querySelector('#orders')
const mainContent = document.querySelector('#main-content')
const newOrderBtn = document.querySelector('#new-order-btn')

//database
const orderRepo = new OrderRepo()

newOrderBtn.addEventListener('click', loadEditorPage)

async function displayOrders() {
    const orders = await orderRepo.getOrders()
    console.log(orders[0])
    const ordersHTML = orders.map(order => `
        <div class="order-desc">
            <h1>Order No - ${order.id} </h1>
            <h2>Total Price  : ${order.orderPrice()}</h2>
            <h2>Total Calories  : ${order.totalCalories()}</h2>
            <button class="btn btn--delete" onclick="deleteOrder('${order.id}')">Cancel Order</button>
        </div>
        <hr>
        <div id="pizza-cards" class="cards">
             ${order.pizzas.map(pizza => pizzaToHTMLCard(pizza, order.id))}
        </div>
        <button id="add-pizza" class="btn btn--add" onclick="loadEditorPage(${order.id})"> + Add Another Pizza</button>
        <hr>`).join('')
    ordersElement.innerHTML = ordersHTML
}
function pizzaToHTMLCard(pizza, orderId) {
    return `<li class="cards__item">
        <div class="card">
            <img class="card__image" src="images/pizza.jpeg" alt="">
            <div class="card__content">
                <div class="card__title">${pizza.name} - Size ${pizza.size}</div>
                <div id="pizza-topping" class="card__title">Toppings</div>
                <ul id="topping-desc" class="card__text">
                   ${pizza.toppings.map(topping => `<li>${topping}</li>`).join('')}
                </ul>   
                <div class="btn--options">
                    <button class="btn btn--update" onclick="loadEditorPage('${orderId}','${pizza.id}')">Update</button>
                    <button class="btn btn--delete" onclick="deletePizza('${orderId}','${pizza.id}')">Remove</button>
                </div>
            </div>
        </div>
    </li>`
}

//this loads the pizza-editor.html for either adding new or updating
async function loadEditorPage(orderId, pizzaId) {

    const pageContent = await fetch('js/views/pizza-editor.html')
    const pageHTML = await pageContent.text()
    mainContent.innerHTML = pageHTML
    const form = document.querySelector('#pizza-editor-form')

    if (parseInt(orderId))
        document.querySelector('#order-id').innerHTML = `Order Id-${orderId}`
    else
        document.querySelector('#order-id').innerHTML = `New Order`

    //if the pizza id is not null that means the person is updating the pizza info
    //so, we need to load the pizza info into the UI
    if (pizzaId) {
        //we are editing a pizza info, so we need to populate the existing pizza information
        console.log('editing')
        const pizza = await orderRepo.getPizza(orderId, pizzaId)
        console.log(pizza.name)

        // document.querySelector('#name').value = pizza.size
        document.querySelector('#size').value = pizza.size
        document.querySelector('#name').value = pizza.name
        for (const topping of pizza.toppings) {
            console.log(topping)
            document.querySelector(`#${topping}`).checked = true
        }

    }

    //when they submit the pizza we send the order id and pizza id
    //to tell the saveOrder method, whether it is edit or add new
    //or whether we are creating new order or adding to existing one

    form.onsubmit = (event) => saveOrder(event, orderId, pizzaId)

}
async function saveOrder(event, orderId, pizzaId) {

    event.preventDefault();
    const form = event.target

    if (!form.checkValidity()) return

    const pizza = form2Object(form)
    console.log("order id ", orderId, "pizza id", pizzaId)
    pizza.id = Date.now().toString()

    if (parseInt(orderId)) {
        //The order exist so we need to know, if it is either updating the pizza or new pizza
        const order = await orderRepo.getOrder(orderId.toString())

        //we either need to add this pizza to existing order or we need to update it
        // console.log(order)
        if (!pizzaId) {
            console.log('adding new pizza')
            order.pizzas.push(pizza)
        } else {
            console.log('updating pizza')
            delete pizza.id
            const index = order.pizzas.findIndex(pizza => pizza.id == pizzaId)
            order.pizzas[index] = {...order.pizzas[index], ...pizza}
        }

        await orderRepo.updateOrder(order)

    } else {
        console.log('We are adding a new order')
        //it is a new order and new pizza
        const order = new PizzaOrder(Date.now().toString(), [pizza])
        await orderRepo.addOrder(order)
    }

    await displayOrders()

    form.reset()
    window.location.href = 'index.html'
}
async function deleteOrder(orderId) {
    if (confirm(`Are you sure you want to delete this order ${orderId}?`)) {
        const message = await orderRepo.deleteOrder(orderId)
        console.log(message)
        await displayOrders()
    }
}
async function deletePizza(orderId, pizzaId) {
    if (confirm(`Are you sure you want to remove the pizza from the order ${orderId}?`)) {
        await orderRepo.deletePizza(orderId, pizzaId)
        await displayOrders()
    }
}
function form2Object(form) {
    const formData = new FormData(form)
    const data = {
        toppings: []
    }
    for (const [key, value] of formData) {
        if (key == "topping")
            data.toppings.push(value)
        else if (key == "size")
            data[key] = parseInt(value)
        else
            data[key] = value
    }
    return data
}


