import {getHero, deleteHero} from '../hero-repo';

export async function GET(request, {params}) {
  try {
    const heroId = params.id;
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