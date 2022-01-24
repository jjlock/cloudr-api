import { Router } from 'itty-router'

import { getPosts, createPost } from './handlers/posts'

const router = Router()

router.get('/api/posts', getPosts)
router.post('/api/posts', createPost)
router.all('*', () => new Response('Not found', { status: 404 }))

export const handleRequest = async request => router.handle(request)