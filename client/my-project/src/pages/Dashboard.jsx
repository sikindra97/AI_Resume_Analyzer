
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ResumeUpload from "../components/ResumeUpload";
import ATSCard from "../components/ATSCard";
import Footer from "../components/Footer";
import API from "../api/axios";

function Dashboard() {
const navigate = useNavigate();
const [showLoginMsg, setShowLoginMsg] =
  useState(false);

  const [result, setResult] =
    useState(null);

  const [darkMode,
    setDarkMode] =
    useState(false);
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
  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
  ? "bg-slate-950 text-white"
  : "bg-gradient-to-b from-sky-50 via-indigo-50 to-purple-50 text-slate-900"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Hero Section */}

<section
  className={`relative overflow-hidden text-white ${
    darkMode
      ? "bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950"
      : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
  }`}
>
        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="max-w-3xl">

            <span
              className="
              bg-white/20
              px-4
              py-2
              rounded-full
              text-sm
              "
            >
              AI Powered ATS Optimization
            </span>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
              AI Resume Analyzer
            </h1>

            <p className="mt-4 text-lg text-blue-100">
              Upload your resume and instantly
              get ATS score, missing keywords,
              AI feedback and cover letter
              suggestions.
            </p>

          </div>

        </div>
      </section>

      {/* Main Section */}

      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Section */}

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
                  : "bg-white"
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
                  text-blue-600
                  px-4
                  py-2
                  rounded-full
                  "
                >
                  PDF Only
                </span>

              </div>

              <ResumeUpload
                setResult={setResult}
              />

            </div>



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
                    : "bg-white"
                }
                `}
              >
               <div>

  <h2 className="text-3xl font-bold mb-6">
    ATS Analysis
  </h2>

  <h3 className="text-2xl font-semibold mb-6">
    ATS Score: {result.atsScore}%
  </h3>

  <div className="mb-6">

    <h3 className="text-xl font-bold mb-3">
      Score Breakdown
    </h3>

    <p>
      Skill Match:
      {result.breakdown?.skillScore || 0}%
    </p>

    <p>
      Experience Match:
      {result.breakdown?.experienceScore || 0}%
    </p>

    <p>
      Education Match:
      {result.breakdown?.educationScore || 0}%
    </p>

    <p>
      Responsibility Match:
      {result.breakdown?.responsibilityScore || 0}%
    </p>

  </div>

  <div className="mb-6">

    <h3 className="text-xl font-bold">
      Matched Skills
    </h3>

    <ul className="list-disc ml-6 mt-2">

      {result.matchedKeywords?.map(
        (skill, index) => (

          <li key={index}>
            {skill}
          </li>

        )
      )}

    </ul>

  </div>

  <div>

    <h3 className="text-xl font-bold">
      Missing Skills
    </h3>

    <ul className="list-disc ml-6 mt-2">

      {result.missingKeywords?.map(
        (skill, index) => (

          <li key={index}>
            {skill}
          </li>

        )
      )}

    </ul>

  </div>

</div>
              </div>

            )}





          </div>

          {/* Right Sidebar */}

          <div className="space-y-6">

            {/* ATS Score */}

            <div
              className={`
              rounded-3xl
              shadow-md
              border
              p-6
              ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white"
              }
              `}
            >
              <h3 className="text-xl font-bold mb-5">
                ATS Score
              </h3>

              <div className="flex justify-center">

                <div
                  className="
                  w-40
                  h-40
                  rounded-full
                  border-[10px]
                  border-green-500
                  flex
                  items-center
                  justify-center
                  "
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

            </div>

            {/* Quick Actions */}

            <div
              className={`
              rounded-3xl
              shadow-md
              border
              p-6
              ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white"
              }
              `}
            >
              <h3 className="text-xl font-bold mb-5">
                Quick Actions
              </h3>
              {showLoginMsg && (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-3 rounded-lg mb-4 flex justify-between items-center">
    <span>
      🔒 Please login to use this feature
    </span>

    <button
      onClick={() => navigate("/login")}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Login
    </button>
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
  hover:bg-blue-700
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
  hover:bg-green-700
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

export default Dashboard;