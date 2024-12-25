// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import toast from "react-hot-toast";
// import useAxiosSecure from "../hooks/useAxiosSecure";

// const MyAssignments = () => {
//     const { user } = useContext(AuthContext);
//     const [submissions, setSubmissions] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     // useEffect(() => {
//     //     const fetchSubmissions = async () => {
//     //         try {
//     //             const response = await fetch(`${import.meta.env.VITE_API_URL}/submissions/${user?.email}`);
//     //             if (response.ok) {
//     //                 const data = await response.json();
//     //                 setSubmissions(data);
//     //             } else {
//     //                 toast.error("Failed to fetch submissions");
//     //             }
//     //         } catch (error) {
//     //             console.error(error);
//     //             toast.error("An error occurred while fetching submissions");
//     //         }
//     //     };

//     //     if (user?.email) {
//     //         fetchSubmissions();
//     //     }
//     // }, [user?.email]);

//     useEffect(()=> {
//         fetchSubmissions()
//     }, [user])

//     const fetchSubmissions = async () => {
//         const { data } = await axiosSecure.get(`/submissions/${user?.email}`)
//         // const { data } = await axiosSecure.get(`/submissions/${submissions?.userEmail}`)
//         setSubmissions(data)
//         console.log(data);
//     }

//     return (
//         <div>
//             <Navbar></Navbar>
//             <div className="max-w-4xl mx-auto my-10">
//                 <h1 className="text-3xl font-bold text-center mb-6">My Submitted Assignments</h1>
//                 {submissions.length > 0 ? (
//                     <table className="w-full border-collapse border border-gray-300">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="border border-gray-300 px-4 py-2">Assignment Title</th>
//                                 <th className="border border-gray-300 px-4 py-2">Status</th>
//                                 <th className="border border-gray-300 px-4 py-2">Total Marks</th>
//                                 <th className="border border-gray-300 px-4 py-2">Obtained Marks</th>
//                                 <th className="border border-gray-300 px-4 py-2">Feedback</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {submissions.map((submission) => (
//                                 <tr key={submission._id} className="text-center">
//                                     <td className="border border-gray-300 px-4 py-2">{submission.title || "N/A"}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{submission.status}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{submission.marks || "Not Graded"}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{submission.obtainedMarks || "N/A"}</td>
//                                     <td className="border border-gray-300 px-4 py-2">{submission.feedback || "No Feedback"}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="text-center text-gray-500 mt-4">No assignments submitted yet.</p>
//                 )}
//             </div>
//             <Footer></Footer>
//         </div>
//     );
// };

// export default MyAssignments;




import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component

const MyAssignments = () => {
    const { user } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false); // State to manage loading
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            fetchSubmissions();
        }
    }, [user]);

    const fetchSubmissions = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const { data } = await axiosSecure.get(`/submissions/${user?.email}`);
            setSubmissions(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while fetching submissions");
        } finally {
            setLoading(false); // Set loading to false once the data is fetched
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto my-10">
                <h1 className="text-3xl font-bold text-center mb-6">My Submitted Assignments</h1>

                {loading ? ( // Show loading spinner if loading is true
                    <LoadingSpinner />
                ) : submissions.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Assignment Title</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Total Marks</th>
                                <th className="border border-gray-300 px-4 py-2">Obtained Marks</th>
                                <th className="border border-gray-300 px-4 py-2">Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission) => (
                                <tr key={submission._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{submission.title || "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{submission.status}</td>
                                    <td className="border border-gray-300 px-4 py-2">{submission.marks || "Not Graded"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{submission.obtainedMarks || "N/A"}</td>
                                    <td className="border border-gray-300 px-4 py-2">{submission.feedback || "No Feedback"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 mt-4">No assignments submitted yet.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyAssignments;
