const db = require("../../config/db");
const SQL = require("./project.sql");

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
