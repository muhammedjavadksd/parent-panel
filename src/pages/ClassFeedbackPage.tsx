
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Star, TrendingUp, Target, Award, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ClassFeedbackPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams();

  const feedback = {
    overallRating: 4.8,
    participation: 95,
    understanding: 88,
    engagement: 92,
    strengths: [
      "Excellent storytelling skills demonstrated",
      "Active participation in discussions", 
      "Creative thinking and imagination",
      "Good grasp of moral values in stories"
    ],
    improvements: [
      "Could work on speaking louder during presentations",
      "Try to ask more questions during the session"
    ],
    aiInsights: "The student showed exceptional creativity and engagement throughout the class. Their understanding of ancient Indian storytelling traditions is impressive for their age group.",
    recommendations: [
      "Continue practicing storytelling at home",
      "Read more ancient Indian tales",
      "Practice public speaking skills"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      <div className="ml-0 sm:ml-16 md:ml-64 flex flex-col min-h-screen">
        <Header onStartTour={() => {}} />
        
        <main className="flex-1 p-2 sm:p-3 lg:p-6 pb-20 sm:pb-0">
          <div className="mb-4 sm:mb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate("/past-classes")}
              className="mb-3 sm:mb-4 border-2 border-yellow-300 text-blue-700 hover:bg-yellow-50 shadow-sm text-sm sm:text-base"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Back to Past Classes
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-1 sm:mb-2">
              AI Class Feedback
            </h1>
            <p className="text-blue-600 text-sm sm:text-base">Detailed AI analysis of your class performance</p>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            {/* Overall Rating */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg border-2 border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800">Overall Performance</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-500 fill-current" />
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800">{feedback.overallRating}</span>
                    <span className="text-gray-600 text-sm sm:text-base">/5.0</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600" />
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{feedback.participation}%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Participation</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">{feedback.understanding}%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Understanding</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600" />
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">{feedback.engagement}%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Engagement</div>
                </div>
              </div>
            </Card>

            {/* Strengths */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-green-200">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 mr-2" />
                Strengths
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {feedback.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">{strength}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Areas for Improvement */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-yellow-200">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-600 mr-2" />
                Areas for Improvement
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {feedback.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-yellow-50 rounded-lg">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">{improvement}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-purple-200">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600 mr-2" />
                AI Insights
              </h3>
              <div className="bg-purple-50 p-3 sm:p-4 rounded-xl">
                <p className="text-gray-700 text-sm sm:text-base">{feedback.aiInsights}</p>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white shadow-lg border-2 border-blue-200">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 mr-2" />
                Recommendations
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {feedback.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm sm:text-base">{recommendation}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassFeedbackPage;
