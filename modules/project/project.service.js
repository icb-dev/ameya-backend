const db = require("../../config/db");
const SQL = require("./project.sql");
const sectionSQL = require("./projectSection.sql");

exports.createProject = async ({ id, slug, project_name, sector, city, project_type, project_logo, project_thumbnail, status }) => {
  await db.query(SQL.INSERT_PROJECT, [
    id,
    slug,
    project_name,
    sector,
    city,
    project_type,
    project_logo,
    project_thumbnail,
    status
  ]);
};

exports.getProjectBySlug = async (slug) => {
  const [rows] = await db.query(SQL.GET_PROJECT_BY_SLUG, [slug]);
  return rows[0];
};

// ✅ ADD THIS
exports.getAllProjects = async () => {
  const [rows] = await db.query(SQL.GET_ALL_PROJECTS);
  return rows;
};

/**
 * Delete project and its sections in a transaction.
 * Deletes sections first, then the project. Throws NOT_FOUND if project doesn't exist.
 */
exports.deleteProject = async (id) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(sectionSQL.DELETE_SECTIONS_BY_PROJECT_ID, [id]);
    const [result] = await connection.query(SQL.DELETE_PROJECT_BY_ID, [id]);
    if (result.affectedRows === 0) {
      throw new Error("NOT_FOUND");
    }
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};
