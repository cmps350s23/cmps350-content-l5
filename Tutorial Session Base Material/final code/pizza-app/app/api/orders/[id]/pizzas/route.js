// get all the orders
import orderRepo from "../../order-repo"

export async function GET(request, { params }) {
    try {
        const { id } = params
        const pizzas = await orderRepo.getOrdersPizzas(id)
        return Response.json(pizzas, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}

export async function POST(request, { params }) {
    try {
        const newPizza = await request.json()
        const orderId = params.id
        console.log(newPizza, orderId);

        const response = await orderRepo.addPizza(orderId, newPizza)
        return Response.json(response, { status: 200 })

        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}