export async function GET(request, { params }) {
  //const  { params } = context;
  return new Response(`Blogs for ${params.year}!`);
}