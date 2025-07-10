
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const announcementsData = [
  {
    title: "Shark Tank Feature",
    description: "Present your ideas to our panel!",
    emoji: "🦈",
    gradient: "from-blue-400 to-cyan-500",
    buttonText: "Learn More"
  },
  {
    title: "Refer & Earn ₹2500",
    description: "Invite friends and earn rewards!",
    emoji: "💰",
    gradient: "from-green-400 to-emerald-500",
    buttonText: "Start Referring"
  },
  {
    title: "New Courses Available",
    description: "Discover exciting new learning paths!",
    emoji: "🎓",
    gradient: "from-purple-400 to-pink-500",
    buttonText: "Explore Now"
  }
];

const Announcements = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Announcements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {announcementsData.map((item, index) => (
          <Card 
            key={index}
            className={`bg-gradient-to-r ${item.gradient} p-6 text-white rounded-2xl hover:scale-105 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm opacity-90 mb-4">{item.description}</p>
              <Button 
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
              >
                {item.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
