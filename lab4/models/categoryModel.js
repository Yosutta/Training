module.exports = class CategoryModel {
  static async getAllCategories(DBconnection) {
    const query = `SELECT * FROM category;`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
    return results
  }

  static async getSingleCategory(DBconnection, category_id) {
    const query = `SELECT * FROM category WHERE id = "${category_id}"`
    const [results, fields] = await DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
    return results
  }

  static async addNewCategory(DBconnection, category_title, category_slug, category_content) {
    const query = `INSERT INTO category(title,slug,content) VALUES ("${category_title}", "${category_slug}", "${category_content}")`
    await DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
  }

  static async editSingleCategory(
    DBconnection,
    category_id,
    new_category_title,
    new_category_slug,
    new_category_content
  ) {
    const query = `UPDATE category SET title="${new_category_title}", slug="${new_category_slug}", content="${new_category_content}" WHERE id="${category_id}";`
    DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
  }

  static async deleteSingleCategory(DBconnection, category_id) {
    const query = `DELETE FROM category WHERE id="${category_id}"`
    DBconnection.promise()
      .query(query)
      .catch((err) => {
        console.error(err)
      })
  }
}
