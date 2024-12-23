import banner from "../assets/rb_6974.png"

const Banner = () => {
    return (
        <div className="w-11/12 mx-auto my-5">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${banner})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="mb-5 text-5xl font-bold">🎓<span className="text-transparent bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text">Online Group Study</span>🎓</h1>
                        <p className="mb-5">
                        Collaborate with friends, complete assignments, and grade each other. Learn and grow together! Turn every study session into a fun and productive experience!
                        </p>
                        <button className="btn btn-primary">Register Now!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;