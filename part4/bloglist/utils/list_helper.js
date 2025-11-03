const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null; 
    }

    const max = blogs.reduce((favorite, current) => {
        if (current.likes > favorite.likes) {
            return current
        }
        else
        {
            return favorite
        }
    });

    return {
        title: max.title,
        author: max.author,
        likes: max.likes
    }

}

module.exports = {
  dummy, totalLikes, favoriteBlog
}