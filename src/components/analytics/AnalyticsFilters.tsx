
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Share, Filter } from "lucide-react";

interface AnalyticsFiltersProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  onExport: () => void;
  onShare: () => void;
}

const AnalyticsFilters = ({ timeRange, onTimeRangeChange, onExport, onShare }: AnalyticsFiltersProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1w">Last Week</SelectItem>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onShare}>
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsFilters;
