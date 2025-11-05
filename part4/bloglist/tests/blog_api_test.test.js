const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are correctly returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs has an id an not an _id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]
  expect(firstBlog.id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Title test',
    author: 'Author test',
    url: 'Url test',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'Title test'
  )

  const authors = blogsAtEnd.map(b => b.author)
  expect(authors).toContain(
    'Author test'
  )

  const urls = blogsAtEnd.map(b => b.url)
  expect(urls).toContain(
    'Url test'
  )

  const totLikes = blogsAtEnd.map(b => b.likes)
  expect(totLikes).toContain(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})