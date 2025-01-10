import React from "react";

const ImpactStories = () => {
    const stories = [
        {
            id: 1,
            image: "https://i.ibb.co.com/fdCzj3n/campaign-a-success.jpg",
            title: "Campaign A Success",
            description: "Thanks to our contributors, this campaign achieved its goals, impacting 500+ lives.",
            link: "/stories/campaign-a",
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/K5PB42P/education-for-all.jpg",
            title: "Education for All",
            description: "Our education campaign helped build schools in underprivileged communities.",
            link: "/stories/education-for-all",
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/2j0qWHF/clean-water-project.jpg",
            title: "Clean Water Project",
            description: "This project brought clean water to remote areas, reducing diseases by 80%.",
            link: "/stories/clean-water",
        },
    ];

    return (
        <div className="my-5">
            <div className="w-11/12 mx-auto bg-gray-100 text-center py-16 px-6">
                <h2 className="text-4xl font-bold mb-6">Impact Stories</h2>
                <p className="text-lg text-gray-600 mb-12">
                    Discover how your contributions have transformed lives and brought positive change across communities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                                <p className="text-gray-600 mb-4">{story.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImpactStories;
