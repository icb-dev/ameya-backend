module.exports = {
    INSERT_SECTION: `
      INSERT INTO project_sections
      (id, project_id, section_type, position, data)
      VALUES (?, ?, ?, ?, ?)
    `,
  
    GET_SECTIONS_BY_PROJECT: `
      SELECT id, section_type, position, data
      FROM project_sections
      WHERE project_id = ?
      ORDER BY position ASC
    `
  };
  