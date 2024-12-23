import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/register-animation.json"; // Replace with your own Lottie animation JSON file

const Register = () => {

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
        <div className="flex items-center justify-center min-h-screen bg-white"> {/* Changed background to white */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                {/* Lottie animation */}
                <div className="flex justify-center mb-6">
                    <Lottie options={defaultOptions} height={150} width={150} />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                <form className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            value=""
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

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

                    {/* Photo URL Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Profile Photo URL</label>
                        <input
                            type="url"
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

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 mt-4 rounded-lg hover:bg-indigo-600 transition"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-indigo-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;









// import { Link } from "react-router-dom";

// const Register = () => {
//     return (
//         <div>
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//                 <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
//                     <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//                     {/* {error && <p className="text-red-500 text-sm mb-4">{error}</p>} */}

//                     <form className="space-y-4">
//                         {/* Name Field */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700">Name</label>
//                             <input
//                                 type="text"
//                                 value=""
//                                 required
//                                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Email Field */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700">Email</label>
//                             <input
//                                 type="email"
//                                 value=""
//                                 required
//                                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Photo URL Field */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700">Profile Photo URL</label>
//                             <input
//                                 type="url"
//                                 value=""
//                                 required
//                                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Password Field */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700">Password</label>
//                             <input
//                                 type="password"
//                                 value=""
//                                 required
//                                 className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                             />
//                         </div>

//                         {/* Register Button */}
//                         <button
//                             type="submit"
//                             className="w-full bg-indigo-500 text-white py-3 mt-4 rounded-lg hover:bg-indigo-600 transition"
//                         >
//                             Register
//                         </button>
//                     </form>

//                     {/* Login Link */}
//                     <div className="mt-6 text-center">
//                         <p className="text-sm">
//                             Already have an account?{" "}
//                             <Link to="/auth/login" className="text-indigo-500 hover:underline">
//                                 Login here
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;