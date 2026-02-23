const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PortfolioSettings = require('./models/PortfolioSettings');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const CodingProfile = require('./models/CodingProfile');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB...');

        // Clear existing data
        await PortfolioSettings.deleteMany({});
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Experience.deleteMany({});
        await CodingProfile.deleteMany({});

        // 1. Portfolio Settings
        await new PortfolioSettings({
            name: "VETRISELVAN V",
            title: "AI & Data Science Student",
            bio: "SNS College of Technology",
            profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=VETRISELVAN",
            resumeLink: "#",
            linkedin: "https://linkedin.com/in/vetriselvan-v-162596382",
            github: "https://github.com",
            email: "vetriselvanv2008@gmail.com",
            aboutDescription: "Motivated B.Tech student in Artificial Intelligence and Data Science with hands-on knowledge of Python and Web Development. Passionate about solving real-world problems using technology and logical thinking. Continuously improving technical skills and applying knowledge in real-time projects and hackathons."
        }).save();

        // 2. Projects
        await Project.insertMany([
            {
                title: "Weather Prediction Web App",
                description: "A robust web application that uses real-time weather APIs to provide current conditions and implements machine learning-based forecasting models for accurate future predictions.",
                tech: ["Python", "ML", "API"],
                icon: "CloudSun"
            },
            {
                title: "Scientific Calculator",
                description: "An advanced calculation tool designed to perform complex mathematical and scientific operations with a focus on accuracy and user-friendly interface.",
                tech: ["Python", "Math"],
                icon: "Calculator"
            },
            {
                title: "Nxt Pharma",
                description: "A specialized analytics platform focused on the pharmaceutical industry, providing deep insights into sales performance and inventory management.",
                tech: ["Analytics", "Data Science"],
                icon: "Database"
            }
        ]);

        // 3. Skills
        await Skill.insertMany([
            { name: "Python", level: 85, category: "Programming" },
            { name: "HTML", level: 90, category: "Web" },
            { name: "CSS", level: 85, category: "Web" },
            { name: "Web Development", level: 80, category: "Web" },
            { name: "Excel", level: 75, category: "Tools" },
            { name: "Design Thinking", level: 85, category: "Tools" },
            { name: "Problem Solving", level: 90, category: "Tools" },
            { name: "Generative AI", level: 80, category: "Interests" },
            { name: "LLMs", level: 75, category: "Interests" },
            { name: "Vibe Coding", level: 90, category: "Interests" }
        ]);

        // 4. Experience (Education, Hackathons, Certs)
        await Experience.insertMany([
            {
                title: "B.Tech – Artificial Intelligence & Data Science",
                company: "SNS College of Technology",
                period: "2022 - 2026",
                type: "education"
            },
            {
                title: "Higher Secondary",
                company: "School",
                period: "90%",
                type: "education"
            },
            {
                title: "SSLC",
                company: "School",
                period: "91.2%",
                type: "education"
            },
            {
                title: "NASA Space App Challenge",
                description: "International Space Apps Challenge Participant",
                period: "2024",
                type: "hackathon"
            },
            {
                title: "HACKNEXT’25",
                description: "National Level Hackathon Participant",
                period: "2025",
                type: "hackathon"
            },
            {
                title: "Zenith’25",
                description: "Technical Symposium Winner",
                period: "2025",
                type: "hackathon"
            },
            {
                title: "Enterprise Design Thinking",
                company: "IBM",
                period: "2024",
                type: "certification"
            },
            {
                title: "AI & Data Science",
                company: "IBM",
                period: "2024",
                type: "certification"
            },
            {
                title: "Cloud Computing",
                company: "AWS",
                period: "2024",
                type: "certification"
            }
        ]);

        // 5. Coding Profiles
        await CodingProfile.insertMany([
            {
                platform: 'GitHub',
                username: 'vetri-selvan',
                description: 'Open source contributor and full-stack developer.',
                icon: 'Github',
                color: 'bg-gray-100',
                link: 'https://github.com/vetri-selvan',
                stats: [
                    { label: 'Repos', value: '45+' },
                    { label: 'Stars', value: '120+' }
                ]
            },
            {
                platform: 'LeetCode',
                username: 'vetri_selvan',
                description: 'Solving complex algorithms and data structure problems.',
                icon: 'Code2',
                color: 'bg-orange-500',
                link: 'https://leetcode.com/vetri-selvan',
                stats: [
                    { label: 'Solved', value: '350+' },
                    { label: 'Rank', value: 'Top 5%' }
                ]
            },
            {
                platform: 'LinkedIn',
                username: 'vetriselvan-v',
                description: 'Connecting with professionals and sharing insights.',
                icon: 'Linkedin',
                color: 'bg-blue-600',
                link: 'https://linkedin.com/in/vetri-selvan',
                stats: [
                    { label: 'Connections', value: '500+' },
                    { label: 'Posts', value: '20+' }
                ]
            },
            {
                platform: 'Devpost',
                username: 'vetriselvan',
                description: 'Showcasing hackathon projects and innovations.',
                icon: 'Award',
                color: 'bg-blue-400',
                link: 'https://devpost.com/vetri-selvan',
                stats: [
                    { label: 'Hackathons', value: '8' },
                    { label: 'Wins', value: '3' }
                ]
            }
        ]);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
