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

    const handleRegister = async e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const photo = form.photo.value;
        const password = form.password.value;
        console.table({email, name, photo, password})

        const passwordError = validatePassword(password);
        if(passwordError){
            toast.error(passwordError)
            return;
        }

        try{
            const result = await createNewUser(email, password)
            console.log(result);
            await updateUserProfile(name, photo)
            setUser({...result.user, photoURL: photo, displayName: name})

            // save user data to db
            const newUser = {name, email, photo, uid: result.user.uid}
            // ${import.meta.env.VITE_API_URL}
            fetch(`http://localhost:5000/users`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    console.log('User created in DB');
                }
            })
            .catch(err => {
                console.log('Error saving user to db', err);
                toast.error('Failed to save user in DATABASE');
            })
            toast.success('Signup Successful')
            navigate('/')
        }
        catch(err){
            console.log(err);
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
                {/* Lottie animation */}
                <div className="flex justify-center mb-6">
                    <Lottie options={defaultOptions} height={150} width={150} />
                </div>

                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

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

                    {/* Photo URL Field */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Profile Photo URL</label>
                        <input
                            type="url"
                            name="photo"
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
