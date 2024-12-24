import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [marks, setMarks] = useState("");
    // const [thumbnail, setThumbnail] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [dueDate, setDueDate] = useState(new Date());

    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const thumbnail = form.thumbnail.value;
        console.table({ title, description, marks, thumbnail, difficulty, dueDate });


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
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        console.log('Assignment added to DB');
                    }
                })
                toast.success('Successfully Added')
                navigate('/')
        }
        catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow my-5">
                <h2 className="text-2xl font-bold text-center mb-6">Create Assignment</h2>
                <form onSubmit={handleCreateAssignment} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            // value={title}
                            // onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="Enter assignment title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            // value={description}
                            // onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="Enter assignment description"
                        ></textarea>
                    </div>

                    {/* Marks */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marks</label>
                        <input
                            type="number"
                            name="marks"
                            // value={marks}
                            // onChange={(e) => setMarks(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="Enter total marks"
                        />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Thumbnail Image URL</label>
                        <input
                            type="url"
                            name="thumbnail"
                            // value={thumbnail}
                            // onChange={(e) => setThumbnail(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg"
                            placeholder="Enter thumbnail URL"
                        />
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                        <select
                            // name="difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Due Date</label>
                        <DatePicker
                            name="dueDate"
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            required
                            className="w-full p-3 mt-1 border rounded-lg"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition"
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