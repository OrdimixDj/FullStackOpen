import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but hides URL and likes by default', () => {
  const blog = {
    title: 'Testing React components with Jest',
    author: 'Test Writer',
    url: 'http://testurl.com',
    likes: 10,
    user: { name: 'P. Testeur', username: 'testuser' }
  }

  const mockHandlers = {
    user: { name: 'testuser', username: 'testuser'},
    handleUpdate: () => {},
    removeBlog: () => {}
  }

  const { container } = render(
    <Blog blog={blog} user={mockHandlers.user} handleUpdate={mockHandlers.handleUpdate} removeBlog={mockHandlers.removeBlog} />
  )

  const titleAndAuthor = screen.getByText('Testing React components with Jest Test Writer')
  expect(titleAndAuthor).toBeDefined()

  const hiddenDetails = container.querySelector('.blog-complete')
  expect(hiddenDetails).toHaveStyle('display: none')

  const urlElement = screen.queryByText(blog.url)
  const likesElement = screen.queryByText(blog.likes)

  expect(urlElement).toBeNull() 
  expect(likesElement).toBeNull()
})