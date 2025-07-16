
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow-sm border gap-3 sm:gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-full sm:w-40">
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
        
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" onClick={onShare} className="flex-1 sm:flex-none">
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" size="sm" onClick={onExport} className="flex-1 sm:flex-none">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsFilters;
