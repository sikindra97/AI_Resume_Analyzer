import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function ResumeUpload({ setResult }) {
const [showLoginMsg, setShowLoginMsg] =useState(false);

const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [jobDescription, setJobDescription] = useState("");

  const [loading,setLoading] =  useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();
      const token = localStorage.getItem("token");

if (!token) {
  setShowLoginMsg(true);
  return;
}

setShowLoginMsg(false);

      if (!file) {

        return alert(
          "Select Resume"
        );
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        // Upload Resume

        const uploadRes =
          await API.post(
            "/resume/upload",
            formData
          );

       const resumeId =
  uploadRes.data.resume._id;

localStorage.setItem(
  "resumeId",
  resumeId
);

localStorage.setItem(
  "jobDescription",
  jobDescription
);
        // Analyze Resume

        const analysisRes =
          await API.post(
            "/analysis/analyze",
            {
              resumeId,
              jobDescription
            }
          );

        console.log(
          "ANALYSIS RESPONSE:",
          analysisRes.data
        );

        setResult({

          atsScore:
            analysisRes.data.atsScore,

          matchedKeywords:
            analysisRes.data.matchedKeywords,

          missingKeywords:
            analysisRes.data.missingKeywords,

          breakdown:
            analysisRes.data.breakdown
        });

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <form
      onSubmit={handleSubmit}
      className="
      bg-white
      p-6
      rounded-xl
      shadow
      "
    >
      {showLoginMsg && (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg mb-4 flex justify-between items-center">
      <span>
        🔒 Please login to upload resume
      </span>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  )}


      <input
        type="file"
        accept=".pdf"
        onChange={(e) =>
          setFile(
            e.target.files[0]
          )
        }
        className="mb-4"
      />

      <textarea
        placeholder="Paste Job Description"
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(
            e.target.value
          )
        }
        className="
        w-full
        border
        p-3
        rounded
        h-40
        mb-4
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded
        hover:bg-blue-700
        disabled:bg-gray-400
        "
      >
        {
          loading
            ? "Analyzing..."
            : "Analyze Resume"
        }
      </button>

    </form>
  );
}

export default ResumeUpload;