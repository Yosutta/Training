export default class PostModel {
  static async getAllPosts(DBconnection) {
    const query = `SELECT id,authorId,title,slug,content FROM post;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        throw err
      })
    return results
  }

  static async getSinglePost(DBconnection, postId) {
    const query = `SELECT id,authorId,title,slug,content FROM post WHERE id = ?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [postId])
      .catch((err) => {
        throw err
      })
    return results[0]
  }

  static async addNewPost(
    DBconnection,
    authorId,
    postTitle,
    postSlug,
    postPublished,
    postCreatedAt,
    postContent
  ) {
    const query = `INSERT INTO post(authorId,title,slug,published,createdAt,content) VALUES (?,?,?,?,?,?)`
    const [results, fields] = await DBconnection.promise()
      .query(query, [
        authorId,
        postTitle,
        postSlug,
        postPublished,
        postCreatedAt,
        postContent,
      ])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async editSinglePost(
    DBconnection,
    postId,
    postTitle,
    postSlug,
    postContent
  ) {
    const query = `UPDATE post SET title=?, slug=?, content=? WHERE id=?;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [postTitle, postSlug, postContent, postId])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async deleteSinglePost(DBconnection, postId) {
    const query = `DELETE FROM post WHERE id=?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [postId])
      .catch((err) => {
        throw err
      })
    return results
  }
}
