
import { useChildren } from "@/hooks/useChildren";
import { useCoins } from "@/contexts/CoinContext";

export const useParentDashboard = () => {
  const { getTotalCoins, getRecentTransactions } = useCoins();

  const childrenData = {
    priya: {
      name: "Priya",
      age: 8,
      grade: 3,
      school: "Sunshine Elementary",
      avatar: "👧",
      classes: 28,
      streak: 15,
      level: "Gold",
      totalMinutes: 450,
      averageScore: 87,
      recentAchievements: [
        { title: "First Class Complete", date: "Jun 15", emoji: "🎉" },
        { title: "5-Day Streak", date: "Jun 18", emoji: "🔥" },
        { title: "Math Master", date: "Jun 20", emoji: "🏆" }
      ],
      subjectProgress: [
        { name: "Math", percentage: 85, improvement: 5 },
        { name: "Science", percentage: 78, improvement: -2 },
        { name: "Arts", percentage: 92, improvement: 8 },
        { name: "Yoga", percentage: 88, improvement: 3 }
      ],
      weeklyActivity: [40, 60, 80, 70, 50, 65, 30]
    },
    arjun: {
      name: "Arjun",
      age: 10,
      grade: 5,
      school: "Green Valley School",
      avatar: "👦",
      classes: 42,
      streak: 23,
      level: "Platinum",
      totalMinutes: 680,
      averageScore: 92,
      recentAchievements: [
        { title: "Science Explorer", date: "Jun 12", emoji: "🔬" },
        { title: "10-Day Streak", date: "Jun 16", emoji: "🔥" },
        { title: "Top Performer", date: "Jun 19", emoji: "⭐" }
      ],
      subjectProgress: [
        { name: "Math", percentage: 94, improvement: 7 },
        { name: "Science", percentage: 96, improvement: 4 },
        { name: "Arts", percentage: 82, improvement: -3 },
        { name: "Yoga", percentage: 89, improvement: 2 }
      ],
      weeklyActivity: [60, 80, 90, 85, 70, 75, 45]
    },
    sara: {
      name: "Sara",
      age: 6,
      grade: 1,
      school: "Little Stars Academy",
      avatar: "👧",
      classes: 15,
      streak: 8,
      level: "Silver",
      totalMinutes: 285,
      averageScore: 83,
      recentAchievements: [
        { title: "Art Champion", date: "Jun 14", emoji: "🎨" },
        { title: "Reading Star", date: "Jun 17", emoji: "📚" },
        { title: "Creative Mind", date: "Jun 21", emoji: "💡" }
      ],
      subjectProgress: [
        { name: "Math", percentage: 76, improvement: 8 },
        { name: "Science", percentage: 82, improvement: 6 },
        { name: "Arts", percentage: 95, improvement: 10 },
        { name: "Yoga", percentage: 79, improvement: 4 }
      ],
      weeklyActivity: [30, 45, 60, 55, 40, 50, 25]
    }
  };

  const getAllChildren = () => {
    return Object.entries(childrenData).map(([key, data]) => ({
      id: key,
      ...data,
      totalCoins: getTotalCoins(key),
      recentTransactions: getRecentTransactions(key, 5)
    }));
  };

  const getFamilyStats = () => {
    const children = getAllChildren();
    const totalClasses = children.reduce((sum, child) => sum + child.classes, 0);
    const totalMinutes = children.reduce((sum, child) => sum + child.totalMinutes, 0);
    const totalCoins = children.reduce((sum, child) => sum + child.totalCoins, 0);
    const averageScore = Math.round(children.reduce((sum, child) => sum + child.averageScore, 0) / children.length);
    const longestStreak = Math.max(...children.map(child => child.streak));

    return {
      totalClasses,
      totalMinutes,
      totalCoins,
      averageScore,
      longestStreak,
      activeChildren: children.length
    };
  };

  const getSubjectComparison = () => {
    const children = getAllChildren();
    const subjects = ["Math", "Science", "Arts", "Yoga"];

    return subjects.map(subject => ({
      subject,
      data: children.map(child => ({
        name: child.name,
        score: child.subjectProgress.find(s => s.name === subject)?.percentage || 0,
        improvement: child.subjectProgress.find(s => s.name === subject)?.improvement || 0
      }))
    }));
  };

  const getActivityTimeline = () => {
    const children = getAllChildren();
    const timeline = [];

    children.forEach(child => {
      child.recentTransactions.forEach(transaction => {
        timeline.push({
          childName: child.name,
          childAvatar: child.avatar,
          activity: transaction.description,
          points: transaction.points,
          date: transaction.timestamp,
          type: transaction.type
        });
      });
    });

    return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 20);
  };

  return {
    getAllChildren,
    getFamilyStats,
    getSubjectComparison,
    getActivityTimeline,
    childrenData
  };
};
