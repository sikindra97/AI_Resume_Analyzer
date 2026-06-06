import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function CoverLetter() {
const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const [resumeId] =
    useState(
      localStorage.getItem(
        "resumeId"
      ) || ""
    );

  const [jobDescription] =
    useState(
      localStorage.getItem(
        "jobDescription"
      ) || ""
    );

  const [coverLetter,
    setCoverLetter] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const generateCoverLetter =
    async () => {

      if (!resumeId) {

        return alert(
          "Please upload and analyze a resume first."
        );
      }

      try {

        setLoading(true);

        const res =
          await API.post(
            "/analysis/cover-letter",
            {
              resumeId,
              jobDescription
            }
          );

        setCoverLetter(
          res.data.coverLetter
        );

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Failed to generate cover letter"
        );

      } finally {

        setLoading(false);
      }
    };

  const copyCoverLetter =
    () => {

      navigator.clipboard.writeText(
        coverLetter
      );

      alert(
        "Cover Letter Copied!"
      );
    };

  const downloadTXT =
    () => {

      const element =
        document.createElement("a");

      const file =
        new Blob(
          [coverLetter],
          {
            type: "text/plain"
          }
        );

      element.href =
        URL.createObjectURL(file);

      element.download =
        "CoverLetter.txt";

      document.body.appendChild(
        element
      );

      element.click();
    };

  return (

    <div
      className="
      min-h-screen
      bg-gray-100
      p-10
      "
    >

      <div
        className="
        max-w-4xl
        mx-auto
        bg-white
        rounded-xl
        shadow
        p-8
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          mb-6
          "
        >
          AI Cover Letter Generator
        </h1>

        <div
          className="
          bg-gray-50
          border
          rounded-lg
          p-4
          mb-6
          "
        >

          <h3
            className="
            text-lg
            font-semibold
            mb-2
            "
          >
            Resume Information
          </h3>

          <p
            className="
            text-sm
            text-gray-600
            break-all
            "
          >
            Resume ID: {resumeId || "Not Found"}
          </p>

        </div>

        <button

          onClick={
            generateCoverLetter
          }

          disabled={loading}

          className="
          bg-green-600
          text-white
          px-6
          py-3
          rounded
          hover:bg-green-700
          disabled:bg-gray-400
          "
        >

          {
            loading
              ? "Generating..."
              : "Generate Cover Letter"
          }

        </button>

        {

          coverLetter && (

            <div
              className="
              mt-8
              bg-gray-50
              border
              rounded
              p-6
              "
            >

              <div
                className="
                flex
                gap-3
                mb-4
                "
              >

                <button
                  onClick={
                    copyCoverLetter
                  }
                  className="
                  bg-blue-600
                  text-white
                  px-4
                  py-2
                  rounded
                  hover:bg-blue-700
                  "
                >
                  Copy
                </button>

                <button
                  onClick={
                    downloadTXT
                  }
                  className="
                  bg-purple-600
                  text-white
                  px-4
                  py-2
                  rounded
                  hover:bg-purple-700
                  "
                >
                  Download TXT
                </button>

              </div>

              <h2
                className="
                text-2xl
                font-bold
                mb-4
                "
              >
                Generated Cover Letter
              </h2>

              <pre
                className="
                whitespace-pre-wrap
                font-sans
                "
              >
                {coverLetter}
              </pre>

            </div>

          )

        }

      </div>

    </div>
  );
}

export default CoverLetter;