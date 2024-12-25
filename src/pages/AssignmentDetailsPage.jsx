import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { compareAsc } from 'date-fns'

const AssignmentDetailsPage = () => {
    const { id } = useParams(); // Assignment ID from the URL
    const { user } = useContext(AuthContext);
    const [assignment, setAssignment] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the assignment details
        const fetchAssignmentDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/assignments/${id}`);
                setAssignment(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load assignment details");
                navigate("/assignments");
            }
        };
        fetchAssignmentDetails();
    }, [id, navigate]);

    const handleTakeAssignment = () => {
        // check if the user can take the assignment
        if(user?.email === assignment?.creator?.email){
            return toast.error("You can not take the task")
        }
        // deadline crossed validation
        if(compareAsc(new Date(), new Date(assignment.dueDate)) === 1){
            return toast.error("Deadline Crossed")
        }
        
        // Open the modal or navigate to the submission form page
        // thikkor
        navigate(`/assignments/${id}/submit`);
    };

    return (
        <div>
            <Navbar></Navbar>
            {assignment ? (
                <div className="max-w-3xl mx-auto mt-6 p-4 border rounded-md my-5">
                    <h2 className="text-2xl font-bold mb-4">{assignment.title}</h2>
                    <p className="mb-2">{assignment.description}</p>
                    <p className="mb-2">Marks: {assignment.marks}</p>
                    <p className="mb-2">Difficulty: {assignment.difficulty}</p>
                    <p className="mb-2">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    <p className="mb-2">Assignment Creator: {assignment?.creator?.email}</p>
                    <p className="mb-2">Creator Name: {assignment?.creator?.name}</p>
                    <button
                        onClick={handleTakeAssignment}
                        className="bg-green-500 text-white py-2 px-4 rounded-md"
                    >
                        Take Assignment
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Footer></Footer>
        </div>
    );
};

export default AssignmentDetailsPage;
