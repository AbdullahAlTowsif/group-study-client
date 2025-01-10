import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const CreateAssignment = () => {
    const { user, loading, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState("easy");
    const [dueDate, setDueDate] = useState(new Date());

    const handleCreateAssignment = async (e) => {
        if (!user?.email) {
            toast.error("You have to login first");
            navigate("/auth/login");
            return;
        }
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const thumbnail = form.thumbnail.value;

        const assignmentData = {
            title,
            description,
            marks,
            thumbnail,
            difficulty,
            dueDate: dueDate.toISOString(),
            creator: {
                email: user?.email,
                name: user?.displayName || "Anonymous",
            },
        };

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/assignments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(assignmentData),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        console.log("Assignment added to DB");
                    }
                });
            toast.success("Successfully Added");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>;
    }

    return (
        <div className="dark:bg-black dark:text-white min-h-screen">
            <Navbar></Navbar>
            <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow my-5">
                <h2 className="text-2xl font-bold text-center mb-6">Create Assignment</h2>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full p-3 mt-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                            placeholder="Enter assignment title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            required
                            className="w-full p-3 mt-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                            placeholder="Enter assignment description"
                        ></textarea>
                    </div>

                    {/* Marks */}
                    <div>
                        <label className="block text-sm font-medium">Marks</label>
                        <input
                            type="number"
                            name="marks"
                            required
                            className="w-full p-3 mt-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                            placeholder="Enter total marks"
                        />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm font-medium">Thumbnail Image URL</label>
                        <input
                            type="url"
                            name="thumbnail"
                            required
                            className="w-full p-3 mt-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                            placeholder="Enter thumbnail URL"
                        />
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="block text-sm font-medium">Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-sm font-medium">Due Date</label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition dark:bg-indigo-700 dark:hover:bg-indigo-600"
                    >
                        Create Assignment
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default CreateAssignment;
