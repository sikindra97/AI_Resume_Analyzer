function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold">
              Resume Analyzer AI
            </h2>

            <p className="text-slate-400 mt-3">
              Improve your ATS score, identify
              missing skills, and generate
              AI-powered feedback and cover
              letters.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Features
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li>ATS Analysis</li>
              <li>AI Resume Feedback</li>
              <li>Cover Letter Generator</li>
              <li>Skill Gap Analysis</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li>Email: sikindrak884@gmail.com</li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-700 my-6" />

        <p className="text-center text-slate-400">
          © {new Date().getFullYear()} Resume Analyzer
          AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;