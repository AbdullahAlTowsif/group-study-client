// const Features = () => {
//     return (
//         <div className="w-11/12 mx-auto mb-5">
//             <div className="py-16 bg-gray-100">
//                 <div className="container mx-auto px-4 text-center">
//                     <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose Online Group Study?</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//                         {/* Feature 1 */}
//                         <div className="feature-card bg-white shadow-md p-6 rounded-lg">
//                             <div className="icon text-purple-500 text-5xl mb-4">
//                                 🎓
//                             </div>
//                             <h3 className="text-xl font-semibold mb-2">Collaborative Assignments</h3>
//                             <p className="text-gray-600">
//                                 Create and work on assignments with your group seamlessly.
//                             </p>
//                         </div>

//                         {/* Feature 2 */}
//                         <div className="feature-card bg-white shadow-md p-6 rounded-lg">
//                             <div className="icon text-blue-500 text-5xl mb-4">
//                                 📋
//                             </div>
//                             <h3 className="text-xl font-semibold mb-2">Peer Grading</h3>
//                             <p className="text-gray-600">
//                                 Evaluate your friends&apos; work and receive constructive feedback.
//                             </p>
//                         </div>

//                         {/* Feature 3 */}
//                         <div className="feature-card bg-white shadow-md p-6 rounded-lg">
//                             <div className="icon text-green-500 text-5xl mb-4">
//                                 📊
//                             </div>
//                             <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
//                             <p className="text-gray-600">
//                                 Monitor your study goals and track assignment completion.
//                             </p>
//                         </div>

//                         {/* Feature 4 */}
//                         <div className="feature-card bg-white shadow-md p-6 rounded-lg">
//                             <div className="icon text-yellow-500 text-5xl mb-4">
//                                 🔔
//                             </div>
//                             <h3 className="text-xl font-semibold mb-2">Real-time Notifications</h3>
//                             <p className="text-gray-600">
//                                 Get instant updates about assignments and group activities.
//                             </p>
//                         </div>

//                         {/* Feature 5 */}
//                         <div className="feature-card bg-white shadow-md p-6 rounded-lg">
//                             <div className="icon text-red-500 text-5xl mb-4">
//                                 🏆
//                             </div>
//                             <h3 className="text-xl font-semibold mb-2">Gamification</h3>
//                             <p className="text-gray-600">
//                                 Earn rewards and badges to stay motivated and engaged.
//                             </p>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default Features;


import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const Features = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-11/12 mx-auto mb-5">
      <div
        className={`py-16 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Why Choose Online Group Study?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className={`feature-card shadow-md p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="icon text-purple-500 text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Collaborative Assignments</h3>
              <p>
                Create and work on assignments with your group seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={`feature-card shadow-md p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="icon text-blue-500 text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">Peer Grading</h3>
              <p>
                Evaluate your friends&apos; work and receive constructive feedback.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`feature-card shadow-md p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="icon text-green-500 text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p>
                Monitor your study goals and track assignment completion.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className={`feature-card shadow-md p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="icon text-yellow-500 text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Notifications</h3>
              <p>
                Get instant updates about assignments and group activities.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className={`feature-card shadow-md p-6 rounded-lg ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="icon text-red-500 text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Gamification</h3>
              <p>
                Earn rewards and badges to stay motivated and engaged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
