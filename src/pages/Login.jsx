import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/login-animation.json"; // You can replace this with your own Lottie animation JSON file

const Login = () => {

    // Lottie animation options
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white"> {/* Changed bg-gradient-to-r to bg-white */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <div className="flex justify-center mb-6">
                    {/* Lottie animation */}
                    <Lottie options={defaultOptions} height={150} width={150} />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            value=""
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            value=""
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 mt-4 rounded-lg hover:bg-indigo-600 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Google Login Button */}
                <button
                    className="w-full bg-red-500 text-white py-3 mt-4 rounded-lg hover:bg-red-600 transition"
                >
                    Login with Google
                </button>

                {/* Register Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/auth/register" className="text-indigo-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;





// import { Link } from "react-router-dom";

// const Login = () => {

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}
//         <form className="space-y-4">
//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               value=""
//               required
//               className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700">Password</label>
//             <input
//               type="password"
//               value=""
//               required
//               className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 text-white py-3 mt-4 rounded-lg hover:bg-indigo-600 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Google Login Button */}
//         <button
//           className="w-full bg-red-500 text-white py-3 mt-4 rounded-lg hover:bg-red-600 transition"
//         >
//           Login with Google
//         </button>

//         {/* Register Link */}
//         <div className="mt-6 text-center">
//           <p className="text-sm">
//             Don&apos;t have an account?{" "}
//             <Link to="/auth/register" className="text-indigo-500 hover:underline">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
