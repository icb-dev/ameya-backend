const db = require("../../config/db");
const SQL = require("./projectSection.sql");

exports.createSection = async ({
  id,
  project_id,
  section_type,
  position,
  data
}) => {
  await db.query(SQL.INSERT_SECTION, [
    id,
    project_id,
    section_type,
    position,
    JSON.stringify(data)
  ]);
};

exports.getSectionsByProject = async (project_id) => {
  const [rows] = await db.query(
    SQL.GET_SECTIONS_BY_PROJECT,
    [project_id]
  );

  return rows;
};
