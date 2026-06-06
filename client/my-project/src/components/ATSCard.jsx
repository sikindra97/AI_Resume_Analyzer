function ATSCard({ result }) {

  if (!result) return null;

  return (

    <div
      className="
      bg-white
      shadow
      rounded-xl
      p-6
      mt-6
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-4
        "
      >
        ATS Analysis
      </h2>

      <p
        className="
        text-xl
        font-semibold
        "
      >
        ATS Score:
        {result.atsScore}%
      </p>

      <div
        className="mt-4"
      >

        <h3
          className="
          font-bold
          "
        >
          Matched Skills
        </h3>

        <ul>

          {
            result.matchedKeywords
            ?.map(
              (skill,index)=>(
                <li
                  key={index}
                >
                  {skill}
                </li>
              )
            )
          }

        </ul>

      </div>

      <div
        className="mt-4"
      >

        <h3
          className="
          font-bold
          "
        >
          Missing Skills
        </h3>

        <ul>

          {
            result.missingKeywords
            ?.map(
              (skill,index)=>(
                <li
                  key={index}
                >
                  {skill}
                </li>
              )
            )
          }

        </ul>

      </div>

    </div>

  );
}

export default ATSCard;