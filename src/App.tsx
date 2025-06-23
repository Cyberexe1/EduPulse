import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import Features from './components/Features';
import TechStack from './components/TechStack';
import Analytics from './components/Analytics';
import SampleOutput from './components/SampleOutput';
import { User } from 'lucide-react';
import WebcamAttentionTracker from './components/WebcamAttentionTracker';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ConferencePage from './components/ConferencePage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import RoomManager from './components/RoomManager';
import TeacherDashboard from './components/TeacherDashboard';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      <ProblemStatement />
      <Features />
      <TechStack />
      <Analytics />
      <SampleOutput />
      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              👨‍💻 Meet the Creators Behind EduPulse
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate team of developers and researchers dedicated to revolutionizing online education
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Vikas Tiwari",
                role: "Backend & AI Engineer",
                description: "Specializes in machine learning algorithms and backend architecture",
                },
              {
                name: "Utsav Singh",
                role: "Frontend Developer & UI/UX",
                description: "Creates intuitive user interfaces and seamless user experiences",
                },
              {
                name: "Om Singh",
                role: "Systems Integration & Analytics",
                description: "Ensures seamless integration and develops analytics solutions",
                },
              {
                name: "Reetika Yadav",
                role: "Research & Privacy Compliance",
                description: "Focuses on research methodologies and privacy protection",
                }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center card-hover">
                <User className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 p-4 text-gray-400" aria-label={member.name} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
                <div className="flex justify-center space-x-3 mt-4">
                  <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 gradient-text">EduPulse</h3>
              <p className="text-gray-300 mb-4">
                AI-powered attention monitoring for smarter online learning. 
                Revolutionizing education through intelligent visual analysis.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#tech-stack" className="text-gray-300 hover:text-white transition-colors">Technology</a></li>
                <li><a href="#analytics" className="text-gray-300 hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#team" className="text-gray-300 hover:text-white transition-colors">Team</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📧 contact@edupulse.ai</li>
                <li>🔗 GitHub Repository</li>
                <li>📋 Privacy Policy</li>
                <li>🏫 Academic Project</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 EduPulse. Built with ❤️ for better online education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// DashboardWrapper component
function DashboardWrapper() {
  const [isTeacher, setIsTeacher] = useState<null | boolean>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || !user.email) {
        setIsTeacher(false);
        setAuthChecked(true);
        setCheckingRole(false);
        navigate('/login');
        return;
      }
      // Check if user is a teacher in any conference
      setCheckingRole(true);
      const q = query(collection(db, 'conferences'), where('teacheremail', '==', user.email));
      const snapshot = await getDocs(q);
      setIsTeacher(!snapshot.empty);
      setAuthChecked(true);
      setCheckingRole(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!authChecked || checkingRole) return <div className="flex items-center justify-center h-screen"><span>Loading...</span></div>;
  return isTeacher ? <TeacherDashboard /> : <Dashboard />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<WebcamAttentionTracker />} />
      <Route path="/conference" element={<ConferencePage />} />
      <Route path="/dashboard" element={<DashboardWrapper />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rooms" element={<RoomManager />} />
    </Routes>
  );
}

export default App;