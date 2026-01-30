module.exports = {
    INSERT_PROJECT: `
      INSERT INTO projects (id, slug, project_name, sector, city, project_type, project_logo, project_thumbnail, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  
    GET_PROJECT_BY_SLUG: `
      SELECT * FROM projects WHERE slug = ?
    `,
  
    // ✅ ADD THIS
    GET_ALL_PROJECTS: `
      SELECT id, slug, project_name, sector, city, project_type, project_logo, project_thumbnail, status, created_at
      FROM projects
      ORDER BY created_at DESC
    `,

    DELETE_PROJECT_BY_ID: `
      DELETE FROM projects WHERE id = ?
    `
  };
  