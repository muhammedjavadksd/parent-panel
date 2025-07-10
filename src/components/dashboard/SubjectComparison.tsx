
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useParentDashboard } from "@/hooks/useParentDashboard";
import { Target, TrendingUp } from "lucide-react";

const SubjectComparison = () => {
  const { getSubjectComparison, getAllChildren } = useParentDashboard();
  const subjectData = getSubjectComparison();
  const children = getAllChildren();

  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D'];

  const radarData = [
    {
      subject: 'Math',
      Priya: 85,
      Arjun: 94,
      Sara: 76
    },
    {
      subject: 'Science',
      Priya: 78,
      Arjun: 96,
      Sara: 82
    },
    {
      subject: 'Arts',
      Priya: 92,
      Arjun: 82,
      Sara: 95
    },
    {
      subject: 'Yoga',
      Priya: 88,
      Arjun: 89,
      Sara: 79
    }
  ];

  return (
    <div className="space-y-4">
      {/* Subject Performance Radar */}
      <Card className="p-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <Target className="w-4 h-4 mr-2 text-purple-600" />
          Subject Performance Overview
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis tick={{ fontSize: 10 }} />
            {children.map((child, index) => (
              <Radar
                key={child.id}
                name={child.name}
                dataKey={child.name}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-4 mt-3">
          {children.map((child, index) => (
            <div key={child.id} className="flex items-center space-x-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-xs text-gray-600">{child.name}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Subject-wise Detailed Comparison */}
      {subjectData.map((subject, subjectIndex) => (
        <Card key={subject.subject} className="p-4 rounded-2xl">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            {subject.subject} Performance
          </h3>
          <div className="space-y-2">
            {subject.data.map((childData, index) => (
              <div key={childData.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-800">{childData.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{childData.score}%</p>
                    <p className={`text-xs ${childData.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {childData.improvement >= 0 ? '↗' : '↘'} {Math.abs(childData.improvement)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Learning Insights */}
      <Card className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
          Learning Insights
        </h3>
        <div className="space-y-2">
          <div className="p-3 bg-white/60 rounded-lg">
            <p className="text-xs font-medium text-gray-800">🎨 Sara excels in Arts with 95% performance</p>
            <p className="text-xs text-gray-600">Consider enrolling her in advanced art classes</p>
          </div>
          <div className="p-3 bg-white/60 rounded-lg">
            <p className="text-xs font-medium text-gray-800">🔬 Arjun shows strong Science aptitude at 96%</p>
            <p className="text-xs text-gray-600">STEM programs could be a great fit</p>
          </div>
          <div className="p-3 bg-white/60 rounded-lg">
            <p className="text-xs font-medium text-gray-800">📚 All children show consistent improvement</p>
            <p className="text-xs text-gray-600">Great job maintaining learning momentum!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubjectComparison;
