import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/login-animation.json";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
    const { user, googleSignIn, userLogin } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogin = async e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.table({ email, password })

        try {
            await userLogin(email, password)
            toast.success('SignIn Successful')
            navigate('/')
        }
        catch (err) {
            toast.error(err?.message)
        }
    }

    const hanldeGoogleSignIn = async () => {
        try {
            await googleSignIn()

            // save user data to db
            const newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                uid: user.uid,
            }
            // ${import.meta.env.VITE_API_URL}
            fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        console.log('User created in DB');
                    }
                })
                .catch(err => {
                    console.log('Error saving user to db', err);
                    toast.error('Failed to save user in DATABASE');
                })
            toast.success('SignIn Successful')
            navigate('/')
        }
        catch (err) {
            // console.log(err);
            toast.error(err?.message)
        }
    }

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
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <div className="flex justify-center mb-6">
                    {/* Lottie animation */}
                    <Lottie options={defaultOptions} height={150} width={150} />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
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
                    onClick={hanldeGoogleSignIn}
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
