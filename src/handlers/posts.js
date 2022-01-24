const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://cloudr-frontend.pages.dev'
}

export const getPosts = async () => {
  let posts = []
  let value = await POSTS_KV.list()
  for (const key of value.keys) {
    const post = await POSTS_KV.get(key.name, {type: 'json'})
    posts.push(post)
  }

  return new Response(JSON.stringify(posts), {
    headers: {
      'Content-type': 'application/json',
      ...corsHeaders
    },
    status: 200
  })
}

export const createPost = async request => {
  const text = await request.text()
  try {
    const data = JSON.parse(text)
    const post = {
      "id": Math.random().toString(36).substring(2, 10),
      "title": data.title,
      "username": data.username,
      "created_at": new Date().toISOString(),
      "content": data.content
    }
    const key = post.username + ';' + post.created_at + ';' + post.id
    await POSTS_KV.put(key, JSON.stringify(post))
  } catch (e) {
    const headers = {
      'Content-type': 'application/json',
      ...corsHeaders
    }
    if (e instanceof SyntaxError) {
      return new Response('unable to parse JSON in request', {
        headers: headers,
        status: 400
      })
    } else if (e instanceof ReferenceError) {
      return new Response('missing required JSON attributes in request', {
        headers: headers,
        status: 400
      })
    } else {
      return new Response('unable to create post due to a server error', {
        headers: headers,
        status: 500
      })
    }
  }

  return new Response('success', {
    headers: {
      'Content-type': 'text/plain',
      ...corsHeaders
    },
    status: 200
  })
}