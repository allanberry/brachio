import slugify from 'slugify';

function indexify(str) {
  return slugify(str, {
    replacement: "",
    lower: true,
  });
} 

export { indexify };