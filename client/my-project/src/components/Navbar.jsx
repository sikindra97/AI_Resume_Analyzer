import { useNavigate } from "react-router-dom";
import {
  Moon,
  Sun,
  FileText,
  LogOut,
} from "lucide-react";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className={`
      sticky top-0 z-50
      backdrop-blur-lg
      border-b
      shadow-lg
      ${
        darkMode
          ? "bg-slate-900/90 border-slate-700"
          : "bg-white/90 border-slate-200"
      }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div
            className="
            w-12 h-12
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            flex items-center justify-center
            shadow-lg
            "
          >
            <FileText
              size={24}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Analyzer
            </h1>

            <p
              className={`text-sm ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              ATS & AI Resume Checker
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Button */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`
            p-3 rounded-xl
            transition-all duration-300
            hover:scale-105
            ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-100 hover:bg-slate-200"
            }
            `}
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {token ? (
            <>
              <button
                onClick={() => navigate("/")}
                className="
                px-5 py-2.5
                rounded-xl
                font-medium
                text-white
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                shadow-lg
                hover:scale-105
                transition-all duration-300
                "
              >
                Dashboard
              </button>

              <button
                onClick={logout}
                className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-xl
                font-medium
                text-white
                bg-gradient-to-r
                from-red-500
                to-rose-600
                shadow-lg
                hover:scale-105
                transition-all duration-300
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  navigate("/login")
                }
                className="
                px-5 py-2.5
                rounded-xl
                font-medium
                text-white
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                shadow-lg
                hover:scale-105
                transition-all duration-300
                "
              >
                Login
              </button>

              <button
                onClick={() =>
                  navigate("/register")
                }
                className="
                px-5 py-2.5
                rounded-xl
                font-medium
                text-white
                bg-gradient-to-r
                from-emerald-500
                to-green-600
                shadow-lg
                hover:scale-105
                transition-all duration-300
                "
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;