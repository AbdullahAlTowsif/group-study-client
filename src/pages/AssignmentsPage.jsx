import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../components/ThemeProvider";
import axios from "axios";

const AssignmentsPage = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [assignments, setAssignments] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    // Fetch assignments from the backend
    const fetchAssignments = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/assignments?filter=${filter}&search=${search}&sort=${sort}`
      );
      setAssignments(data);
    };
    fetchAssignments();
  }, [filter, search, sort]);

  const handleDelete = async (id, creatorEmail) => {
    if (user?.email !== creatorEmail) {
      toast.error("You cannot delete this assignment. You are not the creator.");
      return;
    }

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
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id, creatorEmail);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleReset = () => {
    setFilter("");
    setSearch("");
    setSort("");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">All Assignments</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div>
            <select
              name="difficulty"
              id="difficulty"
            //   className="border p-4 rounded-lg"
            className={`${
                theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-800"
              }`}
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="">Filter By Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 placeholder-gray-500 bg-transparent outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Enter Assignment Title"
              aria-label="Enter Assignment Title"
            />
            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600">
              Search
            </button>
          </div>

          <div>
            <select
              name="category"
              id="category"
              onChange={(e) => setSort(e.target.value)}
            //   className="border p-4 rounded-md"
            className={`${
                theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-800"
              }`}
              value={sort}
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button onClick={handleReset} className="btn">
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className={`p-4 shadow-lg rounded-lg ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <img
                src={assignment.thumbnail}
                alt="Assignment Thumbnail"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
              <p className="mb-2">Marks: {assignment.marks}</p>
              <p className="mb-2">Difficulty: {assignment.difficulty}</p>
              <p className="mb-4">
                Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
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
