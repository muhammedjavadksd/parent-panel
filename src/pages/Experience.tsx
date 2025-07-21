import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Star, Brain, BookOpen, Target, Award, Zap, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "@/components/Sidebar"; // Assumed path
import Header from "@/components/Header"; // Assumed path
import BookingPopup from '@/components/BookingPopup'; // Assumed path

/**
 * Experience Page
 * * A dedicated page to showcase the premium learning programs and encourage users
 * to book a free trial class.
 */
const Experience = () => {
    const navigate = useNavigate();

    // State to manage the visibility and type of the booking popup.
    const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
    const [bookingType, setBookingType] = useState<'demo' | 'masterclass'>('demo');

    /**
     * Handles the click event for booking a demo class.
     * It sets the booking type to 'demo' and opens the popup.
     */
    const handleDemoBooking = () => {
        setBookingType('demo');
        setBookingPopupOpen(true);
    };

    /**
     * A callback function that runs after the booking is complete.
     * Currently logs the action to the console.
     */
    const handleBookingComplete = (childId: number, bookingType: string) => {
        console.log('Experience Page: Booking completed for child:', childId, 'type:', bookingType);
        // You can add navigation or other logic here after a booking is made.
    };

    return (
        <div className="min-h-screen bg-white">
            <Sidebar />

            <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
                <Header onStartTour={() => { }} />

                <main className="flex-1 p-2 sm:p-3 lg:p-4 md:p-4 space-y-2 sm:space-y-3 lg:space-y-4 md:space-y-4 max-w-7xl mx-auto w-full pb-20 sm:pb-0">
                    {/* Page Header */}
                    <div className="p-4 sm:p-6 lg:p-8 md:p-6 bg-white border-b border-blue-100">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl md:text-3xl font-bold text-blue-800 mb-2">
                            Experience Our Learning Programs
                        </h1>
                        <p className="text-blue-600 text-sm sm:text-base lg:text-lg md:text-base">Discover a new way of learning designed for success.</p>
                    </div>

                    <div className="p-2 sm:p-4 lg:p-8 md:p-6">
                        {/* Premium Book Demo Class Card - Responsive */}
                        <Card className="relative p-3 sm:p-4 md:p-4 rounded-xl sm:rounded-2xl md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer overflow-hidden border-2 border-blue-200 bg-white mb-4 sm:mb-6 md:mb-4" onClick={handleDemoBooking}>
                            {/* Premium badges */}
                            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-3 md:right-3 flex flex-col space-y-1 sm:space-y-2 md:space-y-1 z-20">
                                <div className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-2 md:py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1 hover:scale-105 transition-all duration-300">
                                    <Gift className="w-3 h-3" />
                                    <span className="hidden sm:inline md:hidden">FREE TRIAL</span>
                                    <span className="sm:hidden md:inline">FREE</span>
                                </div>
                                <div className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-2 md:py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                                    <Star className="w-3 h-3" />
                                    <span className="hidden sm:inline md:hidden">BESTSELLER</span>
                                    <span className="sm:hidden md:inline">BEST</span>
                                </div>
                            </div>

                            <div className="relative z-10">
                                {/* Main Header - Responsive */}
                                <div className="text-center mb-4 sm:mb-6 md:mb-4">
                                    <div className="flex justify-center mb-2">
                                        <div className="bg-blue-600 p-2 rounded-lg sm:rounded-xl md:rounded-lg shadow-lg">
                                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                                        </div>
                                    </div>
                                    <h2 className="text-lg sm:text-xl lg:text-2xl md:text-xl font-bold text-blue-800 mb-1 sm:mb-2 leading-tight">
                                        Experience Premium Learning
                                    </h2>
                                    <p className="text-xs sm:text-sm md:text-xs text-blue-600">Transform your child's academic journey with our flagship programs</p>
                                </div>

                                {/* Program Cards - Responsive Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-3 mb-4 sm:mb-6 md:mb-4">
                                    {/* Alpha Maths - Responsive */}
                                    <div className="bg-blue-50 p-3 sm:p-4 md:p-3 rounded-lg sm:rounded-xl md:rounded-lg border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        <div className="flex items-center mb-2 sm:mb-3 md:mb-2">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg mr-2 sm:mr-3 md:mr-2">
                                                <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm sm:text-lg md:text-sm font-bold text-blue-800 mb-0">Alpha Maths</h3>
                                                <p className="text-blue-600 font-semibold text-xs sm:text-sm md:text-xs">Smart Math Learning</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 mb-2 sm:mb-3 md:mb-2">
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-blue-800 font-medium">Visual Math Concepts</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-blue-800 font-medium">Interactive Problem Solving</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-blue-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-blue-800 font-medium">Adaptive Learning Path</span>
                                            </div>
                                        </div>
                                        <div className="bg-white p-2 rounded-lg border border-blue-200 shadow-sm">
                                            <p className="text-xs text-blue-700 font-semibold flex items-center"><Target className="w-3 h-3 mr-1" /> Perfect for building strong math foundations</p>
                                        </div>
                                    </div>

                                    {/* Unbox English - Responsive */}
                                    <div className="bg-yellow-50 p-3 sm:p-4 md:p-3 rounded-lg sm:rounded-xl md:rounded-lg border-2 border-yellow-200 hover:border-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        <div className="flex items-center mb-2 sm:mb-3 md:mb-2">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg mr-2 sm:mr-3 md:mr-2">
                                                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm sm:text-lg md:text-sm font-bold text-blue-800 mb-0">Unbox English</h3>
                                                <p className="text-blue-600 font-semibold text-xs sm:text-sm md:text-xs">Creative Language Arts</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 mb-2 sm:mb-3 md:mb-2">
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-blue-800 font-medium">Creative Writing Skills</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-blue-800 font-medium">Reading Comprehension</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-blue-800 font-medium">Public Speaking Confidence</span>
                                            </div>
                                        </div>
                                        <div className="bg-white p-2 rounded-lg border border-yellow-200 shadow-sm">
                                            <p className="text-xs text-blue-700 font-semibold flex items-center"><Award className="w-3 h-3 mr-1" /> Unlock your child's communication potential</p>
                                        </div>
                                    </div>

                                    {/* Little Yogi - Responsive */}
                                    <div className="bg-green-50 p-3 sm:p-4 md:p-3 rounded-lg sm:rounded-xl md:rounded-lg border-2 border-green-200 hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        <div className="flex items-center mb-2 sm:mb-3 md:mb-2">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-8 md:h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg mr-2 sm:mr-3 md:mr-2">
                                                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm sm:text-lg md:text-sm font-bold text-green-800 mb-0">Little Yogi</h3>
                                                <p className="text-green-700 font-semibold text-xs sm:text-sm md:text-xs">Bhagavad Gita for Kids</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 mb-2 sm:mb-3 md:mb-2">
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-green-900 font-medium">Cultural Awareness & Moral Values</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-green-900 font-medium">Tackle Exam Stress & Peer Pressure</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs sm:text-sm md:text-xs">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 bg-green-500 rounded-full flex items-center justify-center shadow-sm"><span className="text-white font-bold text-xs">✓</span></div>
                                                <span className="text-green-900 font-medium">Shloka Recitation & Real-Life Application</span>
                                            </div>
                                        </div>
                                        <div className="bg-white p-2 rounded-lg border border-green-200 shadow-sm">
                                            <p className="text-xs text-green-700 font-semibold flex items-center"><Award className="w-3 h-3 mr-1" /> Make Gita a way of life</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Premium Benefits Row - Responsive */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-2 mb-4 sm:mb-6 md:mb-4">
                                    <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200">
                                        <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">🆓</div>
                                        <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">100% Free Trial</p>
                                        <p className="text-xs text-blue-600 mt-1">No commitment needed</p>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-200">
                                        <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">👨‍🏫</div>
                                        <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">Expert Teachers</p>
                                        <p className="text-xs text-blue-600 mt-1">IIT & IIM graduates</p>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200">
                                        <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">🎯</div>
                                        <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">Personalized Learning</p>
                                        <p className="text-xs text-blue-600 mt-1">Adapted to your pace</p>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 md:p-2 bg-white rounded-lg sm:rounded-xl md:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-200">
                                        <div className="text-lg sm:text-2xl md:text-lg mb-1 sm:mb-2">⚡</div>
                                        <p className="text-xs sm:text-sm md:text-xs font-bold text-blue-800">Instant Results</p>
                                        <p className="text-xs text-blue-600 mt-1">See progress immediately</p>
                                    </div>
                                </div>

                                {/* Premium CTA Section - Responsive */}
                                <div className="text-center">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 md:py-3 px-6 sm:px-8 md:px-6 rounded-xl sm:rounded-2xl md:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-lg md:text-sm transform hover:scale-105 border-2 border-blue-600" onClick={handleDemoBooking}>
                                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 mr-2 sm:mr-3 md:mr-2" />
                                        Book Your FREE Trial Now!
                                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 ml-2 sm:ml-3 md:ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>

            {/* Booking Popup */}
            <BookingPopup
                isOpen={bookingPopupOpen}
                onClose={() => setBookingPopupOpen(false)}
                bookingType={bookingType}
                onBookingComplete={handleBookingComplete}
            />
        </div>
    );
}

export default Experience;
