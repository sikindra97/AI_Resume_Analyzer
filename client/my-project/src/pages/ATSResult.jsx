import { useLocation } from "react-router-dom";

function ATSResult() {

  const location = useLocation();

  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          No Analysis Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-4xl font-bold mb-8">
          ATS Analysis Report
        </h1>

        <div className="mb-6">

          <h2 className="text-2xl font-semibold">
            ATS Score
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {result.atsScore}%
          </p>

        </div>

        <div className="mb-6">

          <h2 className="text-2xl font-semibold mb-2">
            Matched Keywords
          </h2>

          <div className="flex flex-wrap gap-2">

            {result.matchedKeywords?.map(
              (skill, index) => (
                <span
                  key={index}
                  className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  "
                >
                  {skill}
                </span>
              )
            )}

          </div>

        </div>

        <div>

          <h2 className="text-2xl font-semibold mb-2">
            Missing Keywords
          </h2>

          <div className="flex flex-wrap gap-2">

            {result.missingKeywords?.map(
              (skill, index) => (
                <span
                  key={index}
                  className="
                  bg-red-100
                  text-red-700
                  px-3
                  py-1
                  rounded-full
                  "
                >
                  {skill}
                </span>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ATSResult;