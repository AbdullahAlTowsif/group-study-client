import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import CreateAssignment from "../pages/CreateAssignment";
import AssignmentsPage from "../pages/AssignmentsPage";
import UpdateAssignmentPage from "../pages/UpdateAssignmentPage";
import AssignmentDetailsPage from "../pages/AssignmentDetailsPage";
import AssignmentSubmission from "../pages/AssignmentSubmission";
import MyAssignments from "../pages/MyAssignments";
import PendingAssignments from "../pages/PendingAssignments";
import GiveMark from "../pages/GiveMark";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    },
    {
        path: "/create-assignments",
        element: <CreateAssignment></CreateAssignment>
    },
    {
        path: "/assignments",
        element: <AssignmentsPage></AssignmentsPage>,
    },
    {
        path: "/assignments/update/:id",
        element: <UpdateAssignmentPage></UpdateAssignmentPage>,
    },
    {
        path: '/assignments/:id',
        element: <AssignmentDetailsPage></AssignmentDetailsPage>,
    },
    {
        path: `/assignments/:id/submit`,
        element: <AssignmentSubmission></AssignmentSubmission>,
    },
    {
        path: '/submissions/:email',
        element: <MyAssignments></MyAssignments>,
    },
    {
        path: '/pending-assignments/:email',
        element: <PendingAssignments></PendingAssignments>
    },
    {
        path: '/assignments/mark/:id',
        element: <GiveMark></GiveMark>
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>,
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
]);

export default router;
