module.exports = class CategoryModel {
  static async getAllCategories(DBconnection) {
    const query = `SELECT * FROM category;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        throw err
      })
    return results
  }

  static async getSingleCategory(DBconnection, category_id) {
    const query = `SELECT * FROM category WHERE id = ? ;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [category_id])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async addNewCategory(
    DBconnection,
    user_id,
    category_title,
    category_slug,
    category_content
  ) {
    const query = `INSERT INTO category(authorId,title,slug,content) VALUES (?,?,?,?)`
    const [results, fields] = await DBconnection.promise()
      .query(query, [user_id, category_title, category_slug, category_content])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async editSingleCategory(
    DBconnection,
    category_id,
    new_category_title,
    new_category_slug,
    new_category_content
  ) {
    const query = `UPDATE category SET title=?, slug=?, content=? WHERE id=?;`
    const [results, fields] = await DBconnection.promise()
      .query(query, [
        new_category_title,
        new_category_slug,
        new_category_content,
        category_id,
      ])
      .catch((err) => {
        throw err
      })
    return results
  }

  static async deleteSingleCategory(DBconnection, category_id) {
    const query = `DELETE FROM category WHERE id=?`
    const [results, fields] = await DBconnection.promise()
      .query(query, [category_id])
      .catch((err) => {
        throw err
      })
    return results
  }
}
