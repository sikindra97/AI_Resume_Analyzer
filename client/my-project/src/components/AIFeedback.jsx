import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function AIFeedback() {
 const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const [feedback, setFeedback] =useState("");

  const [loading, setLoading] = useState(false);

  const getFeedback = async () => {

    try {

      setLoading(true);

      const resumeId =
        localStorage.getItem("resumeId");

      const jobDescription =
        localStorage.getItem("jobDescription");

      const res =
        await API.post(
          "/analysis/ai-analysis",
          {
            resumeId,
            jobDescription
          }
        );

      setFeedback(
        res.data.feedback
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to generate feedback"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          AI Resume Feedback
        </h1>

        <button
          onClick={getFeedback}
          className="bg-purple-600 text-white px-6 py-3 rounded"
        >
          {
            loading
              ? "Generating..."
              : "Generate AI Feedback"
          }
        </button>

        {feedback && (

          <div className="mt-6">

            <pre className="whitespace-pre-wrap">
              {feedback}
            </pre>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIFeedback;