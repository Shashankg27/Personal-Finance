import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const Logout = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      const userData = jwtDecode(token);
      setUser(userData);
    } else {
      navigate('/signin');
    }
  }, []);

  const logout = () => {
    document.cookie =
      'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUser(null);
    navigate('/');
  };

  return (
    <div className="relative bg-[#1e293b] text-white">

      {/* Username + Dropdown arrow */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 bg-transparent"
      >
        <span>{user?.name || 'User'}</span>
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-1 right-0 bg-[#1e293b] rounded-md shadow-lg">
          <button
            onClick={logout}
            className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
