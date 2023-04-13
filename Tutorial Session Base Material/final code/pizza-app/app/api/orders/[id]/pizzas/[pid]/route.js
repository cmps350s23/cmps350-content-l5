import orderRepo from "../../../order-repo"

export async function PUT(request, { params }) {
    try {
        const { id, pid } = params

        const updatedPizza = await request.json()


        const response = await orderRepo.updatePizza(id, pid, updatedPizza)
        return Response.json(response, { status: 200 })

    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}

export async function GET(request, { params }) {
    try {
        const { id, pid } = params
        const pizza = await orderRepo.getPizza(id, pid)
        return Response.json(pizza, { status: 200 })

    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}
export async function DELETE(request, { params }) {
    try {
        const { id, pid } = params
        const response = await orderRepo.deletePizza(id, pid)

        return Response.json(response, { status: 200 })


    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}