import { useLocation, useNavigate } from "react-router-dom";

function ATSResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const result =
    location.state?.result ||
    (() => {
      try {
        return JSON.parse(
          localStorage.getItem("atsResult")
        );
      } catch {
        return null;
      }
    })();

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <div className="bg-white rounded-2xl shadow p-10 text-center max-w-md w-full">

          <h1 className="text-3xl font-bold mb-3">
            No Analysis Found
          </h1>

          <p className="text-gray-500 mb-6">
            Please upload a resume and analyze it first.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-blue-700
            "
          >
            Analyze Resume
          </button>

        </div>

      </div>
    );
  }

  const score = Number(result.atsScore || 0);

  const scoreColor =
    score >= 80
      ? "text-green-600"
      : score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow p-8 mb-6">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div>

              <h1 className="text-4xl font-extrabold">
                ATS Analysis Report
              </h1>

              <p className="text-gray-500 mt-2">
                Resume compatibility and keyword analysis
              </p>

            </div>

            <div className="text-center">

              <p
                className={`
                  text-5xl
                  font-extrabold
                  ${scoreColor}
                `}
              >
                {score}%
              </p>

              <p className="text-gray-500">
                ATS Score
              </p>

            </div>

          </div>

        </div>

        {/* Breakdown */}

        <div className="bg-white rounded-2xl shadow p-8 mb-6">

          <h2 className="text-2xl font-bold mb-6">
            Score Breakdown
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <ResultScore
              title="Skill Match"
              score={result.breakdown?.skillScore}
            />

            <ResultScore
              title="Experience Match"
              score={result.breakdown?.experienceScore}
            />

            <ResultScore
              title="Education Match"
              score={result.breakdown?.educationScore}
            />

            <ResultScore
              title="Responsibility Match"
              score={
                result.breakdown?.responsibilityScore
              }
            />

            <ResultScore
              title="Resume Quality"
              score={
                result.breakdown?.resumeQualityScore
              }
            />

          </div>

        </div>

        {/* Keywords */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Matched */}

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-5">
              Matched Keywords
            </h2>

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
                        py-2
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
                No matched keywords found.
              </p>
            )}

          </div>

          {/* Missing */}

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-5">
              Missing Keywords
            </h2>

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
                        py-2
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
                ✓ No major missing keywords.
              </p>
            )}

          </div>

        </div>

        {/* Recommendations */}

        {result.recommendations?.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-8 mt-6">

            <h2 className="text-2xl font-bold mb-5">
              Recommendations
            </h2>

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
                    "
                  >
                    <span className="font-bold">
                      {index + 1}.
                    </span>{" "}
                    {recommendation}
                  </div>
                )
              )}

            </div>

          </div>
        )}

        {/* Back */}

        <div className="mt-8">

          <button
            onClick={() => navigate("/dashboard")}
            className="
              bg-gray-900
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-gray-800
            "
          >
            ← Analyze Another Resume
          </button>

        </div>

      </div>

    </div>
  );
}


/* ==================================================
   RESULT SCORE
================================================== */

function ResultScore({ title, score }) {
  const value = Number(score || 0);

  return (
    <div className="border rounded-xl p-4">

      <div className="flex justify-between mb-2">

        <span className="font-medium">
          {title}
        </span>

        <span className="font-bold">
          {value}%
        </span>

      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">

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

export default ATSResult;