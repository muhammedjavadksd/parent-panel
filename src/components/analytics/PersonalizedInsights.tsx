
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Target, TrendingUp, Brain, Star, Calendar } from "lucide-react";

const PersonalizedInsights = () => {
  const insights = [
    {
      type: "strength",
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: "Math Excellence",
      description: "You're performing exceptionally well in Mathematics with 94% average score. Consider taking advanced challenges!",
      action: "Explore Advanced Math",
      priority: "high"
    },
    {
      type: "improvement",
      icon: <Target className="w-5 h-5 text-blue-500" />,
      title: "English Writing Focus",
      description: "Your reading comprehension is strong, but creative writing could use more practice. 15 minutes daily can help!",
      action: "Start Writing Practice",
      priority: "medium"
    },
    {
      type: "habit",
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      title: "Optimal Learning Time",
      description: "Your best performance is between 4-6 PM. Try scheduling challenging subjects during this time.",
      action: "Adjust Schedule",
      priority: "low"
    },
    {
      type: "motivation",
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      title: "Consistency Boost",
      description: "You've maintained a 7-day learning streak! Keep it up to unlock the 'Dedicated Learner' badge.",
      action: "Continue Streak",
      priority: "high"
    },
    {
      type: "strategy",
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      title: "Study Method Optimization",
      description: "Visual learning works best for you. Try mind maps and diagrams for complex topics.",
      action: "Try Visual Tools",
      priority: "medium"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className="p-6 rounded-2xl bg-gradient-to-br from-white to-indigo-50 border-indigo-200 shadow-xl">
      <div className="flex items-center mb-6">
        <Lightbulb className="text-indigo-500 mr-3" size={24} />
        <h3 className="text-xl font-bold text-gray-800">AI-Powered Insights</h3>
        <span className="ml-auto bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Powered by AI</span>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(insight.priority)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {insight.icon}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <Button size="sm" variant="outline" className="text-xs">
                    {insight.action}
                  </Button>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {insight.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
        <p className="text-sm text-indigo-800">
          💡 <strong>Pro Tip:</strong> These insights are updated weekly based on your learning patterns. Check back regularly for new recommendations!
        </p>
      </div>
    </Card>
  );
};

export default PersonalizedInsights;
