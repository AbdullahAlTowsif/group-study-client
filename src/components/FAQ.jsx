const FAQ = () => {
    return (
        <div className="w-11/12 mx-auto mb-5">
            <div className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 max-w-4xl mx-auto">

                        {/* FAQ 1 */}
                        <div tabIndex="0" className="collapse collapse-arrow bg-white shadow-md rounded-lg">
                            <div className="collapse-title text-lg font-medium">
                                What is Online Group Study?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    Online Group Study is a platform where you can collaborate with friends to create and complete assignments, grade each other&apos;s work, and track your learning progress.
                                </p>
                            </div>
                        </div>

                        {/* FAQ 2 */}
                        <div tabIndex="0" className="collapse collapse-arrow bg-white shadow-md rounded-lg">
                            <div className="collapse-title text-lg font-medium">
                                Can I grade assignments?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    Yes! You can evaluate your friends&apos; assignments, provide feedback, and improve through mutual learning.
                                </p>
                            </div>
                        </div>

                        {/* FAQ 3 */}
                        <div tabIndex="0" className="collapse collapse-arrow bg-white shadow-md rounded-lg">
                            <div className="collapse-title text-lg font-medium">
                                How do I track my progress?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    The platform provides detailed progress reports that show your assignment completion rates and overall performance.
                                </p>
                            </div>
                        </div>

                        {/* FAQ 4 */}
                        <div tabIndex="0" className="collapse collapse-arrow bg-white shadow-md rounded-lg">
                            <div className="collapse-title text-lg font-medium">
                                Are there rewards for completing assignments?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    Yes! You can earn badges and other rewards for achieving milestones, making the learning process fun and engaging.
                                </p>
                            </div>
                        </div>

                        {/* FAQ 5 */}
                        <div tabIndex="0" className="collapse collapse-arrow bg-white shadow-md rounded-lg">
                            <div className="collapse-title text-lg font-medium">
                                Is the platform free to use?
                            </div>
                            <div className="collapse-content">
                                <p>
                                    The basic features are free. However, we also offer optional premium plans with additional features.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default FAQ;