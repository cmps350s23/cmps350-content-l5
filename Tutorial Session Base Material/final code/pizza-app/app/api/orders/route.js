// get all the orders
import orderRepo from "./order-repo"

export async function GET(request) {
    try {
        const orders = await orderRepo.getOrders()
        return Response.json(orders, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const newOrder = await request.json()
        const response = await orderRepo.addOrder(newOrder)
        return Response.json(response, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}