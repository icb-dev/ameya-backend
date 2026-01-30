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

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Project ID required" });
  }
  if (!UUID_REGEX.test(id)) {
    return res.status(400).json({ error: "Invalid project ID" });
  }
  try {
    await service.deleteProject(id);
    res.status(204).send();
  } catch (err) {
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Project not found" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
