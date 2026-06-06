const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// ======================
// AI FEEDBACK
// ======================

const generateSuggestions = async (
  resumeText,
  jobDescription
) => {

  const prompt = `
You are a professional ATS and Resume Reviewer.

Analyze the resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide response in this exact format:

ATS Score: XX/100

Missing Skills:
- Skill 1
- Skill 2

Resume Improvements:
- Improvement 1
- Improvement 2
- Improvement 3

Strong Areas:
- Strong Point 1
- Strong Point 2
- Strong Point 3

Keep response under 250 words.
`;

  const completion =
    await groq.chat.completions.create({

      model:
      "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.3
    });

  return completion
    .choices[0]
    .message
    .content;
};

// ======================
// COVER LETTER
// ======================

const generateCoverLetter = async (
  resumeText,
  jobDescription
) => {

  const prompt = `
Generate a professional cover letter.

Rules:
- Maximum 180 words.
- Use 3 short paragraphs.
- Keep it concise.
- No placeholders.
- Mention only relevant skills.
- Suitable for freshers and entry-level developers.
- Return only the cover letter.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const completion =
    await groq.chat.completions.create({

      model:
      "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.4
    });

  return completion
    .choices[0]
    .message
    .content;
};

module.exports = {
  generateSuggestions,
  generateCoverLetter
};