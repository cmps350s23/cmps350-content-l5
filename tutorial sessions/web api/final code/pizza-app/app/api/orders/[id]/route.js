import orderRepo from "../order-repo"

export async function DELETE(request, { params }) {
    try {

        const { id } = params

        const response = await orderRepo.deleteOrder(id)
        return Response.json(response, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}

