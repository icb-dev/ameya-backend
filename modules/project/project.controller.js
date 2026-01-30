const { v4: uuidv4 } = require("uuid");
const service = require("./project.service");

exports.createProject = async (req, res) => {
  try {
    const id = uuidv4();
    const { slug, project_name, sector, city, project_type, project_logo, project_thumbnail, status } = req.body;

    await service.createProject({
      id,
      slug,
      project_name,
      sector,
      city,
      project_type,
      project_logo,
      project_thumbnail,
      status
    });

    res.status(201).json({
      message: "Project created",
      id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await service.getProjectBySlug(req.params.slug);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ADD THIS FUNCTION
exports.listProjects = async (req, res) => {
  try {
    const projects = await service.getAllProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
