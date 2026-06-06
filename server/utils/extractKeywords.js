// function extractKeywords(text) {

//     const words =
//         text
//         .toLowerCase()
//         .match(/[a-zA-Z+#.]+/g);

//     return [...new Set(words)];
// }

// module.exports =
// extractKeywords;




const keywords = [
  "html",
  "css",
  "javascript",
  "react",
  "react.js",
  "node",
  "node.js",
  "express",
  "express.js",
  "mongodb",
  "mysql",
  "postgresql",
  "java",
  "c++",
  "python",
  "git",
  "github",
  "data structures",
  "algorithms",
  "problem solving",
  "communication skills",
  "rest api",
  "rest apis"
];

function extractKeywords(text) {

  text = text.toLowerCase();

  const found = [];

  for (const keyword of keywords) {

    if (text.includes(keyword)) {

      found.push(keyword);
    }
  }

  return [...new Set(found)];
}

module.exports = extractKeywords;