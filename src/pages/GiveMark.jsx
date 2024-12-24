import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";

const GiveMark = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState([]);
    const [obtainedMarks, setObtainedMarks] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/assignments/mark/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setAssignment(data);
                } else {
                    toast.error("Failed to fetch assignment details");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching assignment details");
            }
        };

        fetchAssignment();
    }, [id]);
    // console.log(assignment);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user?.email === assignment?.userEmail) {
            toast.error("You cannot mark your own task.");
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/assignments/mark/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ obtainedMarks, feedback }),
            });
            if (response.ok) {
                toast.success("Marks submitted successfully");
                navigate(`/submissions/${user?.email}`);
            } else {
                toast.error("Failed to submit marks");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while submitting marks");
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-md my-5">
                <h2 className="text-2xl font-bold mb-6 text-center">Give Mark</h2>
                {assignment && (
                    <div className="mb-4">
                        <p>
                            <strong>Google Docs Link:</strong>
                            <a href={assignment.googleDocsLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> {assignment.googleDocsLink}</a>
                        </p>

                        <p><strong>Notes:</strong> {assignment.quickNote}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="obtainedMarks" className="block text-sm font-medium text-gray-700">
                            Obtained Marks
                        </label>
                        <input
                            type="number"
                            id="obtainedMarks"
                            className="w-full p-2 border rounded-md"
                            value={obtainedMarks}
                            onChange={(e) => setObtainedMarks(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                            Feedback
                        </label>
                        <textarea
                            id="feedback"
                            className="w-full p-2 border rounded-md"
                            rows="4"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                        Submit
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default GiveMark;
