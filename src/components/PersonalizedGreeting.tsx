
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

interface PersonalizedGreetingProps {
  childName?: string;
}

const PersonalizedGreeting = ({ childName }: PersonalizedGreetingProps) => {
  const { user } = useAuth();
  const displayName = childName || user?.parent_name || "Friend";

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    if (hour < 12) {
      return {
        message: `Good morning, ${displayName}! ☀️`,
        subtitle: `Ready to start this beautiful ${day}?`,
        gradient: "from-yellow-100/80 to-orange-100/80 dark:from-yellow-900/30 dark:to-orange-900/30",
        border: "border-yellow-200/50 dark:border-yellow-500/40"
      };
    } else if (hour < 17) {
      return {
        message: `Good afternoon, ${displayName}! 🌤️`,
        subtitle: `Hope you're having a wonderful ${day}!`,
        gradient: "from-blue-100/80 to-sky-100/80 dark:from-blue-900/30 dark:to-sky-900/30",
        border: "border-blue-200/50 dark:border-blue-500/40"
      };
    } else {
      return {
        message: `Good evening, ${displayName}! 🌙`,
        subtitle: `Time to wind down and reflect on today!`,
        gradient: "from-purple-100/80 to-indigo-100/80 dark:from-purple-900/30 dark:to-indigo-900/30",
        border: "border-purple-200/50 dark:border-purple-500/40"
      };
    }
  };

  const greeting = getCurrentGreeting();

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${greeting.gradient} ${greeting.border} backdrop-blur-sm border`}>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{greeting.message}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-200">{greeting.subtitle}</p>
      </div>
    </div>
  );
};

export default PersonalizedGreeting;
