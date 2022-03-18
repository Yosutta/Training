export default class CategoryModel {
  static async getAllCategories(DBconnection) {
    const query = `SELECT id,authorId,title,slug,content FROM category;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        throw err
      })
    return results
  }

  static async getSingleCategory(DBconnection, categoryId) {
    const query = `SELECT id,authorId,title,slug,content FROM category WHERE id = ? ;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [categoryId])
      .catch((err) => {
        throw err
      })
    return results[0]
  }

  static async addNewCategory(
    DBconnection,
    userId,
    categoryTitle,
    categorySlug,
    categoryContent
  ) {
    const query = `INSERT INTO category(authorId,title,slug,content) VALUES (?,?,?,?)`
    const [results, fields] = await DBconnection.promise()
      .query(query, [userId, categoryTitle, categorySlug, categoryContent])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async editSingleCategory(
    DBconnection,
    categoryId,
    categoryTitle,
    categorySlug,
    categoryContent
  ) {
    const query = `UPDATE category SET title=?, slug=?, content=? WHERE id=?;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [categoryTitle, categorySlug, categoryContent, categoryId])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async deleteSingleCategory(DBconnection, categoryId) {
    const query = `DELETE FROM category WHERE id=?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [categoryId])
      .catch((err) => {
        throw err
      })
    return results
  }
}
