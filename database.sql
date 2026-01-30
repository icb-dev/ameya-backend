

CREATE TABLE projects (
  id CHAR(36) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  project_name VARCHAR(255),
  status ENUM('ongoing', 'completed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE project_sections (
  id CHAR(36) PRIMARY KEY,
  project_id CHAR(36),
  section_type VARCHAR(50),
  position INT,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- alter table to add this columns
ALTER TABLE projects
ADD COLUMN sector VARCHAR(255) AFTER project_name,
ADD COLUMN city VARCHAR(255) AFTER sector,
ADD COLUMN project_type VARCHAR(255) AFTER city,
ADD COLUMN project_logo VARCHAR(255) AFTER project_type,
ADD COLUMN project_thumbnail VARCHAR(255) AFTER project_type;