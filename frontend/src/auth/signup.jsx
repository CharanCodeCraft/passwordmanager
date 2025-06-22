import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required", {
        position: "top-center",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
      });
      return;
    }

    try {
      console.log("Form Data:", formData); // Debugging line
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Login Successful", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/login/"); // Use React Router path
        }, 1500);
      } else {
        toast.error(data.message || "Login Failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="authout flex justify-center items-center">
      <ToastContainer />
      <div className="authin flex flex-col md:flex-row w-full max-w-[900px] min-h-[400px] mx-auto shadow-xl bg-white mt-12 rounded-lg overflow-hidden">
        <div className="right w-full md:w-[60%] flex justify-center items-center p-6 bg-[#afd4ff]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-col1 mb-6">
              Sign Up
            </h2>

            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              <div className="forminput_cont flex flex-col my-2 gap-2 w-full">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white p-2 text-sm w-full border border-gray-500"
                />
              </div>
              <div className="forminput_cont flex flex-col my-2 gap-2 w-full">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white p-2 text-sm w-full border border-gray-500"
                />
              </div>
              <div className="forminput_cont flex flex-col my-2 gap-2 w-full">
                <label className="font-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-white p-2 text-sm w-full border border-gray-500"
                />
              </div>

              <button
                type="submit"
                className="main_button bg-[#2E5077] text-white font-semibold py-2 px-8 self-center m-2"
              >
                Signup
              </button>

              <p className="self-center my-2 text-gray-500">
                    Already have an account?{" "}
                <Link to="/login" className="text-[#2E5077]">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
