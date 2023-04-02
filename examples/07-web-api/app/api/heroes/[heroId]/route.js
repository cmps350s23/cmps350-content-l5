import {getHero, updateHero, deleteHero} from '../hero-repo';

export async function GET(request,  {params}) {
  try {
    //const {params} = context;
    const heroId = params.heroId;
    console.log('getHero.params.id', heroId);
    const hero = await getHero(parseInt(heroId))
    console.log(JSON.stringify(hero, null, 2));
    if (hero) {
       return Response.json(hero);
    } else {
      return Response.json({ error: `Hero with id ${heroId} not found`}, 
                  {status: 404 });
    }
  } catch (err) {
      console.log(err);
      return Response.json({ error: err.message}, {status: 500 });
  }
}

export async function DELETE(request, {params}) {
  try {
      const heroId = params.id;
      await deleteHero(heroId)
      return new Response(`Hero with id ${heroId} deleted`)
  }
  catch (err) {
    console.log(err);
    return Response.json({ error: err.message}, { status: 500 });
  }
}

export async function PUT(request) {
  try {
      const hero = await request.json()
      await updateHero(hero)
      return new Response("Hero updated")
  }
  catch (err) {
    console.log(err)
    return Response.json({ error: err.message}, { status: 500 })
  } 
}