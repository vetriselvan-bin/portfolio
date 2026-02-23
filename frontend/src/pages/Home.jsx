import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Hackathons from '../components/Hackathons';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
        >
            <Hero />
            <About />
            <Projects />
            <Hackathons />
            <Certifications />
            <Contact />
        </motion.main>
    );
};

export default Home;
