import type { PostInput, SigninInput, SignupInput, UpdatePostInput } from '@lazy_support_engineer/medium-common'

const API_BASE_URL = 'https://backend.ravirajkumar101-hitece2020.workers.dev/api/v1'

type AuthResponse = { jwt: string }
export type Post = { id: string; title: string; content: string; published: boolean }

export async function authenticate(mode: 'signin' | 'signup', payload: SigninInput | SignupInput) {
  const response = await fetch(`${API_BASE_URL}/user/${mode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Unable to complete authentication.')
  }

  return response.json() as Promise<AuthResponse>
}

export async function getPosts(token: string) {
  const response = await fetch(`${API_BASE_URL}/blog/bulk`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Your session has expired. Please sign in again.' : 'Unable to load your stories.')
  }

  const data = await response.json() as { posts: Post[] }
  return data.posts
}

export async function getPost(token: string, id: string) {
  const response = await fetch(`${API_BASE_URL}/blog/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Your session has expired. Please sign in again.' : 'Unable to load this story.')
  }

  const data = await response.json() as { post: Post | null }
  return data.post
}

export async function createPost(token: string, payload: PostInput) {
  const response = await fetch(`${API_BASE_URL}/blog/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error((await response.text()) || 'Unable to save your story.')
  return response.json() as Promise<{ id: string }>
}

export async function updatePost(token: string, payload: UpdatePostInput) {
  const response = await fetch(`${API_BASE_URL}/blog/`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error((await response.text()) || 'Unable to save your changes.')
  return response.json() as Promise<{ id: string }>
}
