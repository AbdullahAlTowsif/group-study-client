import React from "react";

const Testimonial = () => {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            image: "https://i.ibb.co.com/5nk6cKq/maxwell.jpg",
            role: "CEO, TechCorp",
            feedback:
                "This platform has been transformative for our education. The user-friendly interface and excellent support made it an absolute pleasure to work with.",
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://i.ibb.co.com/7jL4Z56/kanewilliamson.jpg",
            role: "Founder, Startup Inc.",
            feedback:
                "I was blown away by the quality of service. Their dedication and attention to detail have exceeded my expectations.",
        },
        {
            id: 3,
            name: "Sam Wilson",
            image: "https://i.ibb.co.com/5rqNJq5/andre-russel.jpg",
            role: "Marketing Director, CreativeWorks",
            feedback:
                "Exceptional service and a team that truly cares. Highly recommend to anyone looking for top-notch solutions.",
        },
    ];

    return (
        <div className="my-5">
            <div className="w-11/12 mx-auto text-center px-16 py-16 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    What Our Clients Say
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                    Hear from our satisfied clients about their experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                                {testimonial.feedback}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
