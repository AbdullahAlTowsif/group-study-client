import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const UpdateAssignmentPage = () => {
    const { user } = useContext(AuthContext);
    const [assignment, setAssignment] = useState({});
    const [difficulty, setDifficulty] = useState("");
    const [dueDate, setDueDate] = useState("");

    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the assignment data by ID
        const fetchAssignment = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignments/update/${id}`)
                if (data?.creator?.email !== user?.email) {
                    toast.error("You cannot update the data! You are not the creator!")
                    navigate('/')
                }
                else {
                    setAssignment(data)
                    setDueDate(data.dueDate)
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching the assignment");
            }
        };
        fetchAssignment();
    }, [id, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const thumbnail = form.thumbnail.value;

        const updatedAssignment = {
            title,
            description,
            marks,
            thumbnail,
            difficulty,
            dueDate,
        };

        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/assignments/update/${id}`, updatedAssignment
            )
            form.reset()
            toast.success('Data updated successfully!')
            navigate('/assignments')
        }
        catch (err) {
            console.error(err);
            toast.error("An error occurred while updating the assignment");
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="my-5">
                <h2 className="text-2xl font-bold text-center mb-6">Update Assignment</h2>
                {assignment ? (
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                defaultValue={assignment.title}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={assignment.description}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks</label>
                            <input
                                type="number"
                                name="marks"
                                defaultValue={assignment.marks}
                                id="marks"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                            <input
                                type="text"
                                name="thumbnail"
                                defaultValue={assignment.thumbnail}
                                id="thumbnail"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                            <select
                                id="difficulty"
                                className="w-full p-2 border rounded-md"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                required
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                className="w-full p-2 border rounded-md"
                                value={dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""}
                                onChange={(e) => setDueDate(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                            Update Assignment
                        </button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default UpdateAssignmentPage;
