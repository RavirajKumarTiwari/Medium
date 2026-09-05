import { useEffect, useState } from 'react'
import { createPost, getPost, updatePost } from '../../lib/api'
import './editor.css'

type EditorPageProps = { postId?: string }

export function EditorPage({ postId }: EditorPageProps) {
  const isEditing = Boolean(postId)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  useEffect(() => {
    if (!postId) return
    const token = localStorage.getItem('daily-post-jwt')
    if (!token) {
      window.location.replace('/signin')
      return
    }
    getPost(token, postId)
      .then((post) => {
        if (!post) setError('This story could not be found.')
        else {
          setTitle(post.title)
          setContent(post.content)
        }
      })
      .catch((requestError: unknown) => {
        const message = requestError instanceof Error ? requestError.message : 'Unable to load this story.'
        if (message.includes('session has expired')) {
          localStorage.removeItem('daily-post-jwt')
          window.location.replace('/signin')
          return
        }
        setError(message)
      })
      .finally(() => setLoading(false))
  }, [postId])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (title.trim() || content.trim()) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [title, content])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('Add a title and some content before saving.')
      return
    }
    const token = localStorage.getItem('daily-post-jwt')
    if (!token) {
      window.location.replace('/signin')
      return
    }
    setError('')
    setSaving(true)
    try {
      const result = isEditing
        ? await updatePost(token, { id: postId!, title: title.trim(), content: content.trim() })
        : await createPost(token, { title: title.trim(), content: content.trim() })
      setSaved(true)
      window.location.assign(`/article/${result.id}`)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to save your story.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <main className="editor-page editor-loading">Opening your story...</main>

  return (
    <main className="editor-page">
      <header className="editor-header">
        <a className="editor-brand" href="/dashboard"><span>D</span> Daily Post</a>
        <div className="editor-header-actions"><span className="editor-saved"><i /> {saved ? 'Saved' : 'Unsaved changes'}</span><a href="/dashboard">Exit editor</a></div>
      </header>
      <form className="editor-form" onSubmit={handleSubmit}>
        <label className="editor-title-label"><span className="sr-only">Story title</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" aria-label="Story title" autoFocus={!isEditing} /></label>
        <div className="editor-toolbar" aria-label="Writing tools">
          <button type="button" aria-label="Bold text"><strong>B</strong></button>
          <button type="button" aria-label="Italic text"><em>I</em></button>
          <span />
          <button type="button" aria-label="Add a link">↗</button>
          <small>Plain text</small>
        </div>
        <label className="editor-content-label"><span className="sr-only">Story content</span><textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Tell your story..." aria-label="Story content" /></label>
        {error && <p className="editor-error" role="alert">{error}</p>}
        <footer className="editor-footer"><span>{wordCount.toLocaleString()} words <i /> Your words, uninterrupted.</span><button type="submit" disabled={saving}>{saving ? 'Saving...' : isEditing ? 'Save changes' : 'Save draft'} <b>↗</b></button></footer>
      </form>
    </main>
  )
}
