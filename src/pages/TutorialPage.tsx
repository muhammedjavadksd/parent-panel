import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, GraduationCap, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tutorialSteps = [
  'Dashboard Overview',
  'Class Schedule',
  'Joining a Class',
  'Submitting Homework',
  'Tracking Progress',
  'Using Coins and Rewards'
];

const TutorialPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Tutorial | Bambinos';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8 px-4 sm:px-8 lg:px-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-block p-4 rounded-full bg-blue-100 shadow-md mb-4">
          <Rocket className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
          Welcome to Your Bambinos Tutorial
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Get to know your dashboard, classes, rewards, and everything else with this step-by-step walkthrough.
        </p>
        <Button
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg"
          onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
        >
          Start Tutorial <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Tutorial Sections Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tutorialSteps.map((step, index) => (
          <Card
            key={index}
            className="p-5 rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center space-x-4 mb-3">
              <div className="p-3 bg-indigo-100 text-indigo-700 rounded-full">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{step}</h3>
            </div>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="h-3 bg-slate-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse" />
            </div>
          </Card>
        ))}
      </div>

      {/* Final Encouragement Section */}
      <Card className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-4xl mx-auto border border-indigo-100">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2">
              Ready to experience it in action?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Book a demo class now and apply what you've learned!
            </p>
          </div>
          <Button
            onClick={() => navigate('/book-demo')}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-md"
          >
            Book Demo Class
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TutorialPage;
