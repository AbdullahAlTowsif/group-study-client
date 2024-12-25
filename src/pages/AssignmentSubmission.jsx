import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

const AssignmentSubmission = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([])
    const {id} = useParams()
    console.log(id);

    useEffect(() => {
        // Fetch assignments from the backend
        const fetchAssignments = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/assignments/${id}`);
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
    }, [id, setAssignments]);
    console.log(assignments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const googleDocsLink = form.googleDocsLink.value;
        const quickNote = form.quickNote.value;
        console.table({googleDocsLink, quickNote});

        const submissionData = {
            title: assignments?.title,
            googleDocsLink,
            quickNote,
            status: "pending",
            userEmail: user?.email,
            creatorEmail: assignments?.creator?.email,
            marks: assignments?.marks
        };

        try {
            await fetch(`${import.meta.env.VITE_API_URL}/assignments/${id}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        console.log('Assignment Submission added to DB');
                    }
                })
                toast.success('Successfully Submitted')
                navigate(`/submissions/${user?.email}`)
        }
        catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-md my-5">
                <h2 className="text-2xl font-bold mb-6 text-center">Submit Assignment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="googleDocsLink"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Google Docs Link
                        </label>
                        <input
                            type="url"
                            name="googleDocsLink"
                            id="googleDocsLink"
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="quickNote"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Quick Note
                        </label>
                        <textarea
                            id="quickNote"
                            name="quickNote"
                            className="w-full p-2 border rounded-md"
                            rows="4"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Submit Assignment
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AssignmentSubmission;
