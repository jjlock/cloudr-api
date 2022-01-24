# Cloudr API

A serverless API responsible for the creation, storage, and distribution of posts on [Cloudr](https://cloudr-frontend.pages.dev), a mock social media platform.

This API was launched using [Cloudflare Workers](https://workers.cloudflare.com/). Posts are stored using [Cloudflare Workers KV](https://www.cloudflare.com/products/workers-kv/).

The frontend repository is located [here](https://github.com/jjlock/cloudr-frontend).

## Endpoints

### GET /posts

Returns a JSON response containing a list of objects with information about posts.

**Example Response**
```
[
    {
        "id": "ujhnzbg2"
        "title": "My First Post",
        "username": "artninja3",
        "created_at": "2022-01-01T00:00:00.000Z",
        "content": "This is my first post."
    },
    {
        "id": "bxcitm2g"
        "title": "Cats are the Best",
        "username": "coolgirl2",
        "created_at": "2022-12-31T23:59:59.000Z",
        "content": "I love my cats!"
    }
]
```

### POST /posts

Creates a post taking JSON as input. Returns `'success'` when successful.

**Example Request Body**
```
{
    "title": "Perfect Popcorn",
    "username": "popcornlover4",
    "content": "I just made the best popcorn ever!"
}
```
