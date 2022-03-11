module.exports = class PostModel {
  static async getAllPosts(DBconnection) {
    const query = `SELECT * FROM post;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        throw err
      })
    return results
  }

  static async getSinglePost(DBconnection, post_id) {
    const query = `SELECT * FROM post WHERE id = ?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [post_id])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async addNewPost(
    DBconnection,
    author_id,
    post_title,
    post_slug,
    post_published,
    post_created_at,
    post_content
  ) {
    const query = `INSERT INTO post(authorId,title,slug,published,createdAt,content) VALUES (?,?,?,?,?,?)`
    const [results, fields] = await DBconnection.promise()
      .query(query, [
        author_id,
        post_title,
        post_slug,
        post_published,
        post_created_at,
        post_content,
      ])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async editSinglePost(
    DBconnection,
    post_id,
    new_post_title,
    new_post_slug,
    new_post_content
  ) {
    const query = `UPDATE post SET title=?, slug=?, content=? WHERE id=?;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [new_post_title, new_post_slug, new_post_content, post_id])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async deleteSinglePost(DBconnection, post_id) {
    const query = `DELETE FROM post WHERE id=?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [post_id])
      .catch((err) => {
        throw err
      })
    return results
  }
}
