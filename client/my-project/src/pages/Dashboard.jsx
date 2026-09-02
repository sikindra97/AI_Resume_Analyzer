import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ResumeUpload from "../components/ResumeUpload";
import Footer from "../components/Footer";

function Dashboard() {
  const navigate = useNavigate();

  const [showLoginMsg, setShowLoginMsg] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [darkMode, setDarkMode] =
    useState(false);

  // --------------------------------------------------
  // Restore previous ATS result
  // --------------------------------------------------

  useEffect(() => {
    const savedResult =
      localStorage.getItem("atsResult");

    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch (error) {
        console.error(
          "Failed to restore ATS result:",
          error
        );

        localStorage.removeItem("atsResult");
      }
    }
  }, []);

  // --------------------------------------------------
  // Login check
  // --------------------------------------------------

  const requireLogin = () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setShowLoginMsg(true);
      return false;
    }

    setShowLoginMsg(false);
    return true;
  };

  const getScoreColor = (score) => {
    if (score >= 80) {
      return "text-green-600";
    }

    if (score >= 60) {
      return "text-yellow-600";
    }

    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) {
      return "Excellent";
    }

    if (score >= 60) {
      return "Good";
    }

    if (score >= 40) {
      return "Needs Improvement";
    }

    return "Low";
  };

  return (
    <div
      className={`
        min-h-screen
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-slate-950 text-white"
            : "bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-50 text-slate-900"
        }
      `}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className={`
          relative
          overflow-hidden
          text-white
          ${
            darkMode
              ? "bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950"
              : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-4xl">

            <span
              className="
                inline-block
                bg-white/20
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
              "
            >
              AI Powered ATS Optimization
            </span>

            <h1
              className="
                text-4xl
                md:text-6xl
                font-extrabold
                mt-6
                leading-tight
              "
            >
              AI Resume Analyzer
            </h1>

            <p className="mt-4 text-lg text-blue-100 max-w-3xl">
              Upload your resume and get an ATS score,
              keyword matching, resume insights,
              missing skills, and AI-powered recommendations.
            </p>

          </div>
        </div>
      </section>

      {/* ==================================================
          MAIN
      ================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ==================================================
              LEFT
          ================================================== */}

          <div className="lg:col-span-2">

            <div
              className={`
                rounded-3xl
                shadow-md
                border
                p-8
                ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }
              `}
            >

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">
                  Upload Resume
                </h2>

                <span
                  className="
                    bg-blue-100
                    text-blue-700
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-medium
                  "
                >
                  PDF Only
                </span>

              </div>

              <ResumeUpload
                setResult={setResult}
              />

            </div>

            {/* ==================================================
                ATS ANALYSIS
            ================================================== */}

            {result && (
              <div
                className={`
                  mt-8
                  rounded-3xl
                  shadow-md
                  border
                  p-8
                  ${
                    darkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-gray-200"
                  }
                `}
              >

                <div className="flex justify-between items-center mb-8">

                  <div>
                    <h2 className="text-3xl font-bold">
                      ATS Analysis
                    </h2>

                    <p
                      className={
                        darkMode
                          ? "text-gray-400 mt-1"
                          : "text-gray-500 mt-1"
                      }
                    >
                      Resume compatibility with the job description
                    </p>
                  </div>

                  <div className="text-right">

                    <p
                      className={`
                        text-4xl
                        font-extrabold
                        ${getScoreColor(result.atsScore)}
                      `}
                    >
                      {result.atsScore}%
                    </p>

                    <p className="text-sm font-medium">
                      {getScoreLabel(result.atsScore)}
                    </p>

                  </div>

                </div>

                {/* Score Breakdown */}

                <div className="mb-8">

                  <h3 className="text-xl font-bold mb-4">
                    Score Breakdown
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <ScoreCard
                      title="Skill Match"
                      score={
                        result.breakdown?.skillScore
                      }
                    />

                    <ScoreCard
                      title="Experience Match"
                      score={
                        result.breakdown?.experienceScore
                      }
                    />

                    <ScoreCard
                      title="Education Match"
                      score={
                        result.breakdown?.educationScore
                      }
                    />

                    <ScoreCard
                      title="Responsibility Match"
                      score={
                        result.breakdown?.responsibilityScore
                      }
                    />

                    <ScoreCard
                      title="Resume Quality"
                      score={
                        result.breakdown?.resumeQualityScore
                      }
                    />

                  </div>

                </div>

                {/* Matched Keywords */}

                <div className="mb-8">

                  <h3 className="text-xl font-bold mb-4">
                    Matched Keywords
                  </h3>

                  {result.matchedKeywords?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">

                      {result.matchedKeywords.map(
                        (skill, index) => (
                          <span
                            key={index}
                            className="
                              bg-green-100
                              text-green-700
                              px-3
                              py-1.5
                              rounded-full
                              text-sm
                              font-medium
                            "
                          >
                            ✓ {skill}
                          </span>
                        )
                      )}

                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No matching keywords found.
                    </p>
                  )}

                </div>

                {/* Missing Keywords */}

                <div className="mb-8">

                  <h3 className="text-xl font-bold mb-4">
                    Missing Keywords
                  </h3>

                  {result.missingKeywords?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">

                      {result.missingKeywords.map(
                        (skill, index) => (
                          <span
                            key={index}
                            className="
                              bg-red-100
                              text-red-700
                              px-3
                              py-1.5
                              rounded-full
                              text-sm
                              font-medium
                            "
                          >
                            ! {skill}
                          </span>
                        )
                      )}

                    </div>
                  ) : (
                    <p className="text-green-600 font-medium">
                      ✓ No major missing keywords detected.
                    </p>
                  )}

                </div>

                {/* Recommendations */}

                {result.recommendations?.length > 0 && (
                  <div>

                    <h3 className="text-xl font-bold mb-4">
                      Recommendations
                    </h3>

                    <div className="space-y-3">

                      {result.recommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="
                              bg-blue-50
                              border
                              border-blue-100
                              p-4
                              rounded-xl
                              text-blue-900
                            "
                          >
                            <span className="font-bold mr-2">
                              {index + 1}.
                            </span>

                            {recommendation}
                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* ==================================================
              RIGHT SIDEBAR
          ================================================== */}

          <div className="space-y-6">

            {/* ATS SCORE */}

            <div
              className={`
                rounded-3xl
                shadow-md
                border
                p-6
                ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }
              `}
            >

              <h3 className="text-xl font-bold mb-6">
                ATS Score
              </h3>

              <div className="flex justify-center">

                <div
                  className={`
                    w-44
                    h-44
                    rounded-full
                    border-[10px]
                    ${
                      result
                        ? result.atsScore >= 80
                          ? "border-green-500"
                          : result.atsScore >= 60
                          ? "border-yellow-500"
                          : "border-red-500"
                        : "border-gray-300"
                    }
                    flex
                    items-center
                    justify-center
                  `}
                >

                  <div className="text-center">

                    <h2 className="text-4xl font-bold">
                      {result
                        ? `${result.atsScore}%`
                        : "--"}
                    </h2>

                    <p className="text-gray-500">
                      Score
                    </p>

                  </div>

                </div>

              </div>

              {result && (
                <p className="text-center mt-5 font-semibold">
                  {getScoreLabel(result.atsScore)}
                </p>
              )}

            </div>

            {/* QUICK ACTIONS */}

            <div
              className={`
                rounded-3xl
                shadow-md
                border
                p-6
                ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }
              `}
            >

              <h3 className="text-xl font-bold mb-5">
                Quick Actions
              </h3>

              {showLoginMsg && (
                <div
                  className="
                    bg-yellow-50
                    border
                    border-yellow-300
                    text-yellow-800
                    p-3
                    rounded-xl
                    mb-4
                  "
                >
                  🔒 Please login to use this feature.
                </div>
              )}

              <div className="space-y-3">

                <button
                  onClick={() => {
                    if (!requireLogin()) return;
                    navigate("/feedback");
                  }}
                  className="
                    w-full
                    bg-blue-600
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-blue-700
                    transition
                  "
                >
                  Generate AI Feedback
                </button>

                <button
                  onClick={() => {
                    if (!requireLogin()) return;
                    navigate("/cover-letter");
                  }}
                  className="
                    w-full
                    bg-green-600
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-green-700
                    transition
                  "
                >
                  Generate Cover Letter
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}


/* ==================================================
   SCORE CARD
================================================== */

function ScoreCard({ title, score }) {
  const value = Number(score || 0);

  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">

      <div className="flex justify-between items-center mb-2">

        <p className="font-medium text-gray-700">
          {title}
        </p>

        <p className="font-bold text-gray-900">
          {value}%
        </p>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">

        <div
          className={`
            h-2
            rounded-full
            ${
              value >= 80
                ? "bg-green-500"
                : value >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }
          `}
          style={{
            width: `${Math.min(value, 100)}%`,
          }}
        />

      </div>

    </div>
  );
}

export default Dashboard;