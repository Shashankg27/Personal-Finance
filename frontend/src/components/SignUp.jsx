import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match!");
      return;
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/signup`, {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        username: formData.username,
        password: formData.password
      }, {
        withCredentials: true
      });

      if(response.data.success){
        navigate('/signin');
      }
      else{
        alert(response.data.message || "Signup failed");
      }
    }
    catch(err){
      console.log("Signup error: " + err);
      alert("Signup failed! Please try again.")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] text-white p-4">
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <div className="flex gap-2 items-center justify-center">
            <i className="fas fa-wallet text-3xl text-blue-500"></i>
            <h2 className="text-2xl font-bold m-0">FinanceBuddy</h2>
          </div>
          <p className="text-xl font-bold mt-1">Create Account</p>
          <p className="text-md text-gray-400">Start your financial journey</p>
        </div>

        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="w-1/2">
              <label htmlFor="firstName" className="text-sm text-gray-100">First Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  id="firstName"
                  name='fname'
                  value={formData.fname}
                  onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                  placeholder="First name"
                  className="bg-[#374151] pl-10 pr-3 py-2 rounded text-sm w-full text-white"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="text-sm text-gray-100">Last Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  id="lastName"
                  name='lname'
                  value={formData.lname}
                  onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                  placeholder="Last name"
                  className="bg-[#374151] pl-10 pr-3 py-2 rounded text-sm w-full text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-100">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                id="email"
                name='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="bg-[#374151] pl-10 pr-3 py-2 rounded text-sm w-full text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="text-sm text-gray-100">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-at"></i>
              </span>
              <input
                type="text"
                id="username"
                name='username'
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Choose a username"
                className="bg-[#374151] pl-10 pr-3 py-2 rounded text-sm w-full text-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-100">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                name='password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                className="bg-[#374151] pl-10 pr-10 py-2 rounded text-sm w-full text-white"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                <i className="fas fa-eye"></i>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm text-gray-100">Confirm Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                className="bg-[#374151] pl-10 pr-10 py-2 rounded text-sm w-full text-white"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                <i className="fas fa-eye"></i>
              </span>
            </div>
          </div>

          <div className="bg-[#374151] text-sm text-gray-400 p-3 rounded mb-2">
            <p className="mb-1 font-semibold text-white">Password requirements:</p>
            <ul className="grid grid-cols-2 gap-x-4 list-disc list-inside text-xs">
              <li>8+ characters</li>
              <li>1 uppercase</li>
              <li>1 lowercase</li>
              <li>1 number</li>
            </ul>
          </div>

          <div className="flex items-center text-center gap-1 text-sm text-gray-400">
            <input type="checkbox" id="terms" onChange={(e) => setAgreed(e.target.checked)}/>
            <label htmlFor="terms">
              I agree to the <a href="#" className="text-blue-400 underline">Terms of Service</a> and <a href="#" className="text-blue-400 underline">Privacy Policy</a>
            </label>
          </div>

          <input
            type="submit"
            value="Create Account"
            disabled={!agreed}
            className="bg-[#2563eb] py-2 rounded text-sm font-semibold w-full mt-2"
          />
        </form>

        <div className="flex items-center w-full my-3">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="w-full text-center">
          <p className="text-sm text-gray-400 inline">
            Already have an account?
            <Link to="/signin" className="text-[#2563eb] text-sm ml-1 !no-underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
