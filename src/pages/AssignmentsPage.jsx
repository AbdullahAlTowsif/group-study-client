import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";  // Assuming you have an AuthContext

const AssignmentsPage = () => {
    const { user } = useContext(AuthContext);  // Get the current user
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        // Fetch assignments from the backend
        const fetchAssignments = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/assignments`);
                if (response.ok) {
                    const data = await response.json();
                    setAssignments(data);
                } else {
                    toast.error("Failed to fetch assignments");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching assignments");
            }
        };
        fetchAssignments();
    }, []);

    const handleDelete = async (id, creatorEmail) => {
        if (user?.email !== creatorEmail) {
            // If the current user is not the creator, show an error
            toast.error("You cannot delete this assignment. You are not the creator.");
            return;
        }

        // Proceed with the delete process
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/assignments/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Assignment deleted successfully");
                setAssignments(assignments.filter((assignment) => assignment._id !== id));
            } else {
                toast.error("Failed to delete assignment");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while deleting the assignment");
        }
    };

    const confirmDelete = (id, creatorEmail) => {
        toast(t => (
            <div className='flex gap-3 items-center'>
                <div>
                    <p>
                        Are you <b>sure?</b>
                    </p>
                </div>
                <div className='gap-2 flex'>
                    <button
                        className='bg-red-400 text-white px-3 py-1 rounded-md'
                        onClick={() => {
                            toast.dismiss(t.id);
                            handleDelete(id, creatorEmail);
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className='bg-green-400 text-white px-3 py-1 rounded-md'
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold text-center mb-6">All Assignments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="bg-white shadow-lg rounded-lg p-4">
                            {/* Assignment Card */}
                            <img
                                src={assignment.thumbnail}
                                alt="Assignment Thumbnail"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                            <p className="text-gray-700 mb-2">Marks: {assignment.marks}</p>
                            <p className="text-gray-500 mb-2">Difficulty: {assignment.difficulty}</p>
                            <p className="text-gray-500 mb-4">
                                Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex justify-between">
                                <Link
                                    to={`/assignments/${assignment._id}`}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/assignments/update/${assignment._id}`}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
                                >
                                    Update
                                </Link>
                                <button
                                    onClick={() => confirmDelete(assignment._id, assignment.creator.email)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AssignmentsPage;
