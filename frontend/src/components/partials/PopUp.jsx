import React from 'react';

const PopUp = ({ popUp, setPopUp }) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
        <div className="bg-gray-700 text-white p-6 rounded-2xl shadow-xl max-w-md w-full relative animate-fade-in">
          {/* Close Button */}
          <button
            className="absolute top-3 right-4 text-white hover:text-gray-300 text-2xl"
            onClick={() => setPopUp(false)}
          >
            &times;
          </button>

          {/* Modal Content */}
          <h2 className="text-xl font-bold mb-3">
            Note:
          </h2>
          <p className="text-sm mb-5">
            This application was developed as part of an academic project.
            All features are completely free to use. Just sign up and enjoy full access without any restrictions or fees.
          </p>
          <button
            onClick={() => setPopUp(false)}
            className="bg-white text-gray-800 px-4 py-2 !rounded-lg hover:bg-gray-200 transition font-semibold"
          >
            Got it, let's go!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
