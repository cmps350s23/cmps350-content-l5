export async function GET(request,  { params }) {
  const { searchParams } = new URL(request.url)
  //const searchParams = url.searchParams
  //console.log(url)
    //const  { params } = context;
  return new Response(`Blogs for ${params.filter}!. 
   Sort by: ${searchParams.get('sortBy')}`);
}