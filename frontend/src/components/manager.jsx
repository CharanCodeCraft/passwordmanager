import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Manager = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [localformarr, setlocalformarr] = useState([]);
  const passref = useRef();

  async function getpass() {
    try {
      let req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/passmanager/`, {
        method: "GET",
        credentials: "include",
      });
      let passwords = await req.json();
      if (Array.isArray(passwords)) {
        setlocalformarr(passwords);
      }
    } catch (err) {
      console.error("Failed to fetch passwords", err);
    }
  }

  useEffect(() => {
    getpass();
  }, []);

  const showpass = () => {
    if (ref.current.src.includes("/icons/eye.png")) {
      ref.current.src = "/icons/eyeoff.png";
      passref.current.type = "text";
    } else {
      ref.current.src = "/icons/eye.png";
      passref.current.type = "password";
    }
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savepassword = async () => {
    if (form.site && form.username && form.password) {
      const newPass = { ...form, id: uuidv4() };
      try {
       const res= await fetch(`${import.meta.env.VITE_BACKEND_URL}/passmanager/`, {
          method: "POST",
          body: JSON.stringify(newPass),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) {
          toast.error("Failed to save password");
          navigate('/login')
        }
        setlocalformarr([...localformarr, newPass]);
        setform({ site: "", username: "", password: "" });
        toast("Password Saved", { position: "top-right", autoClose: 2000 });
      } catch (error) {
        console.error("Error saving password:", error);
      }
    } else {
      toast("No password saved", { position: "top-right", autoClose: 2000 });
    }
  };

  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    toast("Password copied", { position: "top-right", autoClose: 2000 });
  };

  const handledel = async (id) => {
    const confirmDelete = confirm("Confirm to delete the password");
    if (confirmDelete) {
      setlocalformarr(localformarr.filter(item => item.id !== id));
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/passmanager/`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      toast("Password Deleted", { position: "top-right", autoClose: 2000 });
    }
  };

  const handleedit = async (id) => {
    const itemToEdit = localformarr.find(item => item.id === id);
    if (itemToEdit) {
      setform(itemToEdit);
      setlocalformarr(localformarr.filter(item => item.id !== id));
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/passmanager/`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
      <div className="absolute inset-0 -z-10 h-[150vh] w-full bg-[#76f4ff29] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#4DA1A9] opacity-20 blur-[100px]"></div>
      </div>
      <div className="in flex flex-col items-center mx-auto m-4 max-w-6xl min-h-96 p-6 ">
        <div className="titile text-white flex flex-col items-center">
          <div className="logo font-bold text-4xl font-mono">
            <span className="text-[#79D7BE]">&lt;</span>
            <span className="text-black">Pass</span>
            <span className="text-[#79D7BE]">Op/&gt;</span>
          </div>
          <p className="text-[#2b2732eb] text-2xl font-mono mb-6">
            Your password manager
          </p>
        </div>
        <input
          type="text"
          className="rounded-full text-xl border-2 w-full border-[#4DA1A9] p-3 py-2 mb-3"
          placeholder="Enter website url"
          name="site"
          value={form.site}
          onChange={handlechange}
        />
        <div className="pass flex py-5 w-full justify-around gap-10 relative">
          <input
            type="text"
            className="rounded-full text-xl border-2 border-[#4DA1A9] p-3 py-2 w-1/2"
            placeholder="Enter your email"
            name="username"
            value={form.username}
            onChange={handlechange}
          />
          <input
            type="password"
            className="rounded-full text-xl border-2 border-[#4DA1A9] p-3 py-2 w-1/2"
            placeholder="Enter your password"
            name="password"
            value={form.password}
            onChange={handlechange}
            ref={passref}
          />
          <span className="absolute right-4 w-7 top-7 cursor-pointer" onClick={showpass}>
            <img ref={ref} src="/icons/eye.png" alt="" className="" />
          </span>
        </div>
        <button>
          <div
            className="add-btn border-2 border-black font-mono text-2xl mt-5 flex hover:bg-[#8cffe0f5] bg-[#30ffc8] h-10 items-center gap-1 w-fit p-6 justify-center rounded-full"
            onClick={savepassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            <h3 className="font-bold">ADD</h3>
          </div>
        </button>
        <h1 className="mt-12 text-3xl font-mono font-bold">
          Your Saved passwords
        </h1>
        {localformarr.length === 0 && (
          <div>
            <h1 className="text-4xl mt-14">No saved passwords to display</h1>
          </div>
        )}
        {localformarr.length !== 0 && (
          <table className="table-auto w-full mt-6 text-center text-2xl ">
            <thead className="bg-[#2E5077] text-white h-14">
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#a2c2e87f]">
              {localformarr.map((item) => (
                <tr className="h-12" key={item.id}>
                  <td><a href={item.site} target="_blank" rel="noreferrer">{item.site}</a></td>
                  <td>{item.username}</td>
                  <td>
                    <div
                      className="passcopy flex justify-center items-center cursor-pointer"
                      onClick={() => copytext(item.password)}
                    >
                      {'*'.repeat(item.password.length)}
                      <dotlottie-player
                        src="https://lottie.host/9a06caf8-9f81-43bd-ba92-125f02653215/XaLVzg2BBM.lottie"
                        background="transparent"
                        speed="1"
                        style={{ width: 50, height: 50 }}
                        autoplay
                        loop
                      ></dotlottie-player>
                    </div>
                  </td>
                  <td>
                    <div className="actions flex justify-center items-center">
                      <span onClick={() => handledel(item.id)}><lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ width: 25, height: 25 }}
                      ></lord-icon></span>
                      <span onClick={() => handleedit(item.id)}><dotlottie-player
                        src="https://lottie.host/a37e8871-72d4-4942-bb0f-f6ae38404101/vgxkTUtYkw.lottie"
                        background="transparent"
                        speed="1"
                        style={{ width: 40, height: 40 }}
                        loop
                        autoplay
                      ></dotlottie-player></span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;