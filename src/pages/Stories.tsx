
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stories = [
  { 
    title: "The Adventures of Panchatantra", 
    category: "Moral Stories", 
    duration: "15 min",
    cover: "📚",
    description: "Classic tales with valuable life lessons"
  },
  { 
    title: "Akbar and Birbal Tales", 
    category: "Historical", 
    duration: "12 min",
    cover: "👑",
    description: "Witty stories from the Mughal court"
  },
  { 
    title: "Science Adventures", 
    category: "Educational", 
    duration: "20 min",
    cover: "🔬",
    description: "Fun experiments and discoveries"
  },
  { 
    title: "Math Magic Stories", 
    category: "Educational", 
    duration: "10 min",
    cover: "🔢",
    description: "Numbers come alive in these tales"
  },
  { 
    title: "Tales from India", 
    category: "Cultural", 
    duration: "18 min",
    cover: "🏛️",
    description: "Rich stories from Indian heritage"
  },
  { 
    title: "Animal Kingdom", 
    category: "Nature", 
    duration: "14 min",
    cover: "🦁",
    description: "Amazing stories about wildlife"
  }
];

const Stories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      <Sidebar />
      
      <div className="ml-64 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">Stories Library</h1>
            <p className="text-orange-700">Discover amazing stories and expand your imagination</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <Card key={index} className="p-6 rounded-2xl bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{story.cover}</div>
                  <h3 className="text-lg font-bold text-orange-800 mb-2">{story.title}</h3>
                  <div className="flex justify-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      {story.category}
                    </span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      {story.duration}
                    </span>
                  </div>
                  <p className="text-sm text-orange-600 mb-4">{story.description}</p>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl">
                  📖 Read Story
                </Button>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stories;
