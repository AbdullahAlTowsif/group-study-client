import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import ImpactStories from "../components/ImpactStories";
import Testimonial from "../components/Testimonial";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Features></Features>
            <ImpactStories></ImpactStories>
            <Testimonial></Testimonial>
            <FAQ></FAQ>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;