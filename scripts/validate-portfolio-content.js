const fs = require('fs');
const path = require('path');

const repositoryRoot = path.resolve(__dirname, '..');
const contentPath = path.join(repositoryRoot, 'content', 'portfolio.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
const errors = [];
const allIds = new Set();

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const isNonEmptyString = value => typeof value === 'string' && value.trim().length > 0;
const isValidDate = value => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
};
const isValidUrl = value => {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && isNonEmptyString(url.hostname);
  } catch {
    return false;
  }
};
const requireString = (value, label) => {
  if (!isNonEmptyString(value)) errors.push(`${label} must be a non-empty string`);
};
const requireArray = (value, label) => {
  if (!Array.isArray(value) || value.length === 0) errors.push(`${label} must be a non-empty array`);
};
const requireArrayField = (value, label) => {
  if (!Array.isArray(value)) errors.push(`${label} must be an array`);
};
const requireId = (value, label) => {
  requireString(value, label);
  if (isNonEmptyString(value) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    errors.push(`${label} must use lowercase kebab-case`);
  }
  if (isNonEmptyString(value)) {
    if (allIds.has(value)) errors.push(`duplicate ID: ${value}`);
    allIds.add(value);
  }
};
const requireUrl = (value, label) => {
  if (!isValidUrl(value)) errors.push(`${label} must be a valid HTTP(S) URL`);
};
const requireDateRange = (item, label) => {
  for (const field of ['startDate', 'endDate']) {
    if (!isValidDate(item[field])) errors.push(`${label}.${field} must use a valid YYYY-MM-DD date`);
  }
  if (isValidDate(item.startDate) && isValidDate(item.endDate) && item.startDate > item.endDate) {
    errors.push(`${label} startDate must not be after endDate`);
  }
};
const requireAsset = (assetPath, label) => {
  requireString(assetPath, label);
  if (!isNonEmptyString(assetPath) || !assetPath.startsWith('/') || assetPath.includes('..')) {
    errors.push(`${label} must be a repository-relative public path beginning with /`);
    return;
  }
  const absolutePath = path.join(repositoryRoot, 'frontend', 'public', assetPath.slice(1));
  if (!fs.existsSync(absolutePath)) errors.push(`${label} does not exist: ${assetPath}`);
};

if (!isObject(content)) errors.push('content root must be an object');
if (content.schemaVersion !== 1) errors.push('schemaVersion must be 1');
if (!isValidDate(content.lastUpdated)) errors.push('lastUpdated must use a valid YYYY-MM-DD date');

if (!isObject(content.person)) {
  errors.push('person must be an object');
} else {
  requireId(content.person.id, 'person.id');
  for (const field of ['name', 'headline', 'role', 'location', 'summary', 'website', 'resumePath']) {
    requireString(content.person[field], `person.${field}`);
  }
  requireUrl(content.person.website, 'person.website');
  requireAsset(content.person.resumePath, 'person.resumePath');
}

if (!isObject(content.contact)) {
  errors.push('contact must be an object');
} else {
  requireString(content.contact.email, 'contact.email');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(content.contact.email || '')) errors.push('contact.email must be valid');
  for (const field of ['linkedin', 'github', 'instagram']) requireUrl(content.contact[field], `contact.${field}`);
}

requireArray(content.projects, 'projects');
for (const [index, project] of (content.projects || []).entries()) {
  const label = `projects[${index}]`;
  if (!isObject(project)) {
    errors.push(`${label} must be an object`);
    continue;
  }
  requireId(project.id, `${label}.id`);
  for (const field of ['title', 'description', 'github', 'thumbnail']) requireString(project[field], `${label}.${field}`);
  if (typeof project.featured !== 'boolean') errors.push(`${label}.featured must be boolean`);
  requireArray(project.tags, `${label}.tags`);
  requireArrayField(project.metrics, `${label}.metrics`);
  if (!project.tags.every(isNonEmptyString)) errors.push(`${label}.tags must contain only non-empty strings`);
  if (!project.metrics.every(isNonEmptyString) && project.metrics.length > 0) errors.push(`${label}.metrics must contain only non-empty strings`);
  requireUrl(project.github, `${label}.github`);
  if (project.demo !== null) requireUrl(project.demo, `${label}.demo`);
  requireAsset(project.thumbnail, `${label}.thumbnail`);
}

for (const collectionName of ['experience', 'education']) {
  requireArray(content[collectionName], collectionName);
  for (const [index, item] of (content[collectionName] || []).entries()) {
    const label = `${collectionName}[${index}]`;
    if (!isObject(item)) {
      errors.push(`${label} must be an object`);
      continue;
    }
    requireId(item.id, `${label}.id`);
    for (const field of ['title', 'organization', 'institution', 'degree', 'location', 'period', 'logo']) {
      if (field in item) requireString(item[field], `${label}.${field}`);
    }
    if (!isNonEmptyString(item.organization) && !isNonEmptyString(item.institution)) errors.push(`${label} needs organization or institution`);
    if (!isNonEmptyString(item.title) && !isNonEmptyString(item.degree)) errors.push(`${label} needs title or degree`);
    requireDateRange(item, label);
    requireAsset(item.logo, `${label}.logo`);
    const detailField = collectionName === 'experience' ? 'points' : 'details';
    requireArray(item[detailField], `${label}.${detailField}`);
    if (!item[detailField].every(isNonEmptyString)) errors.push(`${label}.${detailField} must contain only non-empty strings`);
  }
}

requireArray(content.skills, 'skills');
for (const [index, group] of (content.skills || []).entries()) {
  const label = `skills[${index}]`;
  if (!isObject(group)) {
    errors.push(`${label} must be an object`);
    continue;
  }
  requireId(group.id, `${label}.id`);
  requireString(group.category, `${label}.category`);
  requireArray(group.items, `${label}.items`);
  for (const [itemIndex, item] of (group.items || []).entries()) {
    const itemLabel = `${label}.items[${itemIndex}]`;
    if (!isObject(item)) {
      errors.push(`${itemLabel} must be an object`);
      continue;
    }
    requireId(item.id, `${itemLabel}.id`);
    for (const field of ['name', 'description']) requireString(item[field], `${itemLabel}.${field}`);
  }
}

if (errors.length > 0) {
  console.error(`Portfolio content validation failed with ${errors.length} error(s):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Portfolio content valid: ${content.projects.length} projects, ${content.experience.length} experience records, ${content.education.length} education records, ${allIds.size} unique IDs.`);
