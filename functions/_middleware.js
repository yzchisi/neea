export async function onRequest({request, next}) {
  const url = new URL(request.url)
  if(url.pathname.startsWith("/json/")){
    return new Response("403 Forbidden", {status:403})
  }
  return next()
}
