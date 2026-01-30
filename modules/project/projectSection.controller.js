const { v4: uuidv4 } = require("uuid");
const sectionService = require("./projectSection.service");

exports.addSection = async (req, res) => {
  try {
    const id = uuidv4();
    const { project_id, section_type, position, data } = req.body;

    await sectionService.createSection({
      id,
      project_id,
      section_type,
      position,
      data
    });

    res.status(201).json({
      message: "Project section added",
      id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const { projectId } = req.params;
    const sections = await sectionService.getSectionsByProject(projectId);

    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
