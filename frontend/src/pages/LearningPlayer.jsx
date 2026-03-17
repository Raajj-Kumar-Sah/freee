import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, 
    CheckCircle, 
    ChevronRight, 
    MessageSquare, 
    Info, 
    FileText, 
    Menu, 
    X, 
    Send,
    Bot
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';


const LearningPlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { api } = useAuth();
    
    const [course, setCourse] = useState(null);
    const [activeLecture, setActiveLecture] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('content');
    const [aiQuestion, setAiQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get(`/courses/${courseId}`);
                setCourse(res.data.data);
                // Set first lecture of first section as active
                if (res.data.data.sections.length > 0 && res.data.data.sections[0].lectures.length > 0) {
                    setActiveLecture(res.data.data.sections[0].lectures[0]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCourse();
    }, [courseId, api]);

    const handleAskAi = async () => {
        if (!aiQuestion.trim()) return;
        setIsAiLoading(true);
        setAiResponse('');
        try {
            const res = await api.post('/ai/ask', {
                question: aiQuestion,
                courseId,
                lectureId: activeLecture?._id
            });
            setAiResponse(res.data.data);
            setAiQuestion('');
        } catch (err) {
            console.error(err);
            setAiResponse("I'm having trouble connecting to the knowledge base. Please try again later.");
        } finally {
            setIsAiLoading(false);
        }
    };


    if (!course) return <div className="min-h-screen flex items-center justify-center">Loading Course...</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
            {/* Player Header */}
            <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 z-30">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <ChevronRight className="rotate-180 w-6 h-6" />
                    </button>
                    <h1 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{course.title}</h1>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Your Progress</p>
                        <p className="text-xs font-black text-primary-600">45% Complete</p>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-black flex flex-col">
                    {/* Video Player Placeholder */}
                    <div className="aspect-video w-full bg-black relative group">
                        {activeLecture ? (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                <Play className="w-20 h-20" />
                                <p className="absolute bottom-12 text-sm font-medium text-white/60">Streaming: {activeLecture.videoUrl}</p>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/50">Select a lecture to play</div>
                        )}
                    </div>

                    {/* Lecture Info Footer */}
                    <div className="p-8 bg-white dark:bg-gray-900 flex-1">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">{activeLecture?.title}</h2>
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 text-xs font-bold rounded-lg uppercase tracking-wider">Lecture</span>
                            <span className="flex items-center text-gray-400 text-xs font-medium">
                                <Info className="w-3 h-3 mr-1" />
                                {activeLecture?.duration} mins
                            </span>
                        </div>
                        
                        {/* Tabs for Info/Resources/AI */}
                        <div className="border-b border-gray-100 dark:border-gray-800 flex space-x-8 mb-6">
                            {['Description', 'Resources'].map((tab) => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`pb-4 text-sm font-extrabold uppercase tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-400'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-3xl">
                            {activeTab === 'description' && (
                                <p>In this lecture, we dive deep into the specific implementation details of the current module. We will cover the core architecture, data flow, and best practices for optimization.</p>
                            )}
                            {activeTab === 'resources' && (
                                <div className="space-y-4">
                                    <a href="#" className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary-600 transition-all">
                                        <FileText className="w-5 h-5 text-primary-600 mr-4" />
                                        <span className="font-bold text-gray-900 dark:text-white">Lecture_Notes.pdf</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className={`fixed md:relative top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 z-20 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-widest text-xs">Course Content</h3>
                            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto">
                            {course.sections.map((section, sIndex) => (
                                <div key={section._id}>
                                    <div className="bg-gray-50 dark:bg-gray-950 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                                        <p className="text-[10px] font-black text-gray-400 uppercase">Section {sIndex + 1}</p>
                                        <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-1">{section.title}</p>
                                    </div>
                                    <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {section.lectures.map((lecture) => (
                                            <button 
                                                key={lecture._id}
                                                onClick={() => setActiveLecture(lecture)}
                                                className={`w-full text-left px-6 py-5 flex items-start space-x-4 transition-colors ${activeLecture?._id === lecture._id ? 'bg-primary-50/50 dark:bg-primary-900/10 border-l-4 border-primary-600' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                                            >
                                                <div className="mt-1">
                                                    {activeLecture?._id === lecture._id ? <Play className="w-4 h-4 text-primary-600 fill-current" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-bold ${activeLecture?._id === lecture._id ? 'text-primary-600' : 'text-gray-700 dark:text-gray-300'}`}>{lecture.title}</p>
                                                    <div className="flex items-center mt-2 text-[10px] text-gray-400 font-medium">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {lecture.duration} mins
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* AI Tutor Floating Panel */}
                        <div className="p-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center space-x-2 mb-4">
                                <Bot className="text-primary-600 w-5 h-5" />
                                <span className="text-xs font-black uppercase tracking-widest text-primary-600">AI Tutor</span>
                            </div>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={aiQuestion}
                                    onChange={(e) => setAiQuestion(e.target.value)}
                                    placeholder="Ask anything..." 
                                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-4 pr-10 text-xs focus:ring-1 focus:ring-primary-600 outline-none"
                                />
                                <button 
                                    onClick={handleAskAi}
                                    disabled={isAiLoading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 disabled:opacity-50"
                                >
                                    {isAiLoading ? <span className="animate-spin text-xs">...</span> : <Send className="w-4 h-4" />}
                                </button>

                            </div>
                            <AnimatePresence>
                                {aiResponse && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-[11px] leading-relaxed text-gray-600 dark:text-gray-400"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-gray-900 dark:text-white">AI Response</span>
                                            <button onClick={() => setAiResponse('')} className="text-gray-400">×</button>
                                        </div>
                                        {aiResponse}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LearningPlayer;

