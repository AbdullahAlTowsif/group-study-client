import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/register-animation.json";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
    const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const photo = form.photo.value;
        const password = form.password.value;

        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        try {
            const result = await createNewUser(email, password);
            await updateUserProfile(name, photo);
            setUser({ ...result.user, photoURL: photo, displayName: name });

            const newUser = { name, email, photo, uid: result.user.uid };

            fetch(`http://localhost:5000/users`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        toast.success("Signup Successful");
                    }
                })
                .catch(() => {
                    toast.error("Failed to save user in DATABASE");
                });

            navigate("/");
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black dark:text-white">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full sm:w-96">
                <div className="flex justify-center mb-6">
                    <Lottie options={defaultOptions} height={150} width={150} />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Photo URL</label>
                        <input
                            type="url"
                            name="photo"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 mt-4 rounded-lg hover:bg-indigo-600 transition"
                    >
                        Register
                    </button>
                </form>

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
