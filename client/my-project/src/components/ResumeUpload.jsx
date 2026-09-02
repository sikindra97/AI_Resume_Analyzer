import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ResumeUpload({ setResult }) {
  const navigate = useNavigate();

  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF resume.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginMsg(true);
      return;
    }

    setShowLoginMsg(false);

    if (!file) {
      setError("Please select your resume PDF.");
      return;
    }

    const cleanJobDescription = jobDescription.trim();

    if (!cleanJobDescription) {
      setError("Please paste the job description.");
      return;
    }

    if (cleanJobDescription.length < 100) {
      setError(
        "Please paste the complete job description. At least 100 characters are required for accurate ATS analysis."
      );
      return;
    }

    try {
      setLoading(true);

      // --------------------------------------------------
      // STEP 1: Upload Resume
      // --------------------------------------------------

      const formData = new FormData();

      formData.append("resume", file);

      const uploadRes = await API.post(
        "/resume/upload",
        formData
      );

      const resumeId = uploadRes.data?.resume?._id;

      if (!resumeId) {
        throw new Error("Resume ID was not returned by server.");
      }

      // Store for AI feedback / cover letter
      localStorage.setItem("resumeId", resumeId);
      localStorage.setItem(
        "jobDescription",
        cleanJobDescription
      );

      // --------------------------------------------------
      // STEP 2: Analyze Resume
      // --------------------------------------------------

      const analysisRes = await API.post(
        "/analysis/analyze",
        {
          resumeId,
          jobDescription: cleanJobDescription,
        }
      );

      console.log(
        "ANALYSIS RESPONSE:",
        analysisRes.data
      );

      const data = analysisRes.data;

      const finalResult = {
        atsScore: Number(data.atsScore || 0),

        matchedKeywords:
          Array.isArray(data.matchedKeywords)
            ? data.matchedKeywords
            : [],

        missingKeywords:
          Array.isArray(data.missingKeywords)
            ? data.missingKeywords
            : [],

        breakdown: {
          skillScore:
            Number(data.breakdown?.skillScore || 0),

          experienceScore:
            Number(data.breakdown?.experienceScore || 0),

          educationScore:
            Number(data.breakdown?.educationScore || 0),

          responsibilityScore:
            Number(
              data.breakdown?.responsibilityScore || 0
            ),

          resumeQualityScore:
            Number(
              data.breakdown?.resumeQualityScore || 0
            ),
        },

        recommendations:
          Array.isArray(data.recommendations)
            ? data.recommendations
            : [],
      };

      setResult(finalResult);

      // Optional:
      // Save result so refresh/navigation can reuse it
      localStorage.setItem(
        "atsResult",
        JSON.stringify(finalResult)
      );

    } catch (error) {
      console.error(
        "ATS ANALYSIS ERROR:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while analyzing the resume.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow"
    >
      {/* Login Message */}

      {showLoginMsg && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-xl mb-5 flex items-center justify-between gap-4">
          <span className="text-sm">
            🔒 Please login to upload and analyze your resume.
          </span>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-blue-700
              transition
              whitespace-nowrap
            "
          >
            Login
          </button>
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-5">
          <p className="font-medium">
            {error}
          </p>
        </div>
      )}

      {/* Resume */}

      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-2">
          Resume
        </label>

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="
            block
            w-full
            border
            border-gray-300
            rounded-xl
            p-3
            text-sm
            bg-gray-50
            cursor-pointer
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {file && (
          <p className="mt-2 text-sm text-green-600">
            ✓ Selected: {file.name}
          </p>
        )}
      </div>

      {/* Job Description */}

      <div className="mb-2">
        <label className="block font-semibold text-gray-800 mb-2">
          Job Description
        </label>

        <textarea
          placeholder="Paste the complete job description here..."
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            p-4
            rounded-xl
            h-48
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
      </div>

      {/* Character Count */}

      <div className="flex justify-between items-center mb-5">
        <p className="text-xs text-gray-500">
          Paste the complete job description for better ATS accuracy.
        </p>

        <p
          className={`text-sm font-medium ${
            jobDescription.trim().length < 100
              ? "text-gray-500"
              : "text-green-600"
          }`}
        >
          {jobDescription.trim().length} characters
        </p>
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          hover:bg-blue-700
          transition
          disabled:bg-gray-400
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Analyzing Resume..."
          : "Analyze Resume"}
      </button>
    </form>
  );
}

export default ResumeUpload;