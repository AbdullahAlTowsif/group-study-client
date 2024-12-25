import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner";

const PendingAssignments = () => {
    const { user } = useContext(AuthContext);
    const [pendingAssignments, setPendingAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user) {
            fetchPendingAssignments();
        }
    }, [user]);

    const fetchPendingAssignments = async () => {
        setLoading(true);
        try {
            const { data } = await axiosSecure.get(`/pending-assignments/${user?.email}`);
            setPendingAssignments(data);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching pending assignments");
        } finally {
            setLoading(false);
        }
    };

    const handleGiveMark = (assignmentId) => {
        navigate(`/assignments/mark/${assignmentId}`);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-5xl mx-auto my-10">
                <h1 className="text-3xl font-bold text-center mb-6">Pending Assignments</h1>
                {loading ? (
                    <LoadingSpinner />
                ) : pendingAssignments.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Assignment Title</th>
                                <th className="border border-gray-300 px-4 py-2">Examinee</th>
                                <th className="border border-gray-300 px-4 py-2">Marks</th>
                                <th className="border border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingAssignments.map((assignment) => (
                                <tr key={assignment._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{assignment.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{assignment.userEmail}</td>
                                    <td className="border border-gray-300 px-4 py-2">{assignment.marks || "Not Graded"}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleGiveMark(assignment._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        >
                                            Give Mark
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 mt-4">No pending assignments available.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PendingAssignments;
