import React from "react";

const LoginModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center hidden">
      <div className="bg-white text-black p-8 rounded-md w-96 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Continue with Google</button>
      </div>
    </div>
  );
};

export default LoginModal;
