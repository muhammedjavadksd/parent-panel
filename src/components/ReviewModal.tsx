import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Star, BookOpen, Calendar, Clock, Users, X } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: {
    admin_class_name: string;
    class_date: string;
    start_time: string;
    end_time: string;
    child_name: string;
  };
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  classData,
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to format time
  const formatTime = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    if (review.trim().length < 10) {
      alert("Please write a review with at least 10 characters");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically send the review to your backend
    console.log("Review submitted:", {
      rating,
      review,
      classData
    });
    
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setRating(0);
    setReview("");
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0);
      setReview("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Class Review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Class Information Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    {classData.admin_class_name}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{formatDate(classData.class_date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{formatTime(classData.start_time, classData.end_time)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{classData.child_name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Section */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-800">
              How would you rate this class? *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-all duration-200 transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {rating === 0 && "Click on a star to rate"}
              {rating === 1 && "Poor - The class didn't meet expectations"}
              {rating === 2 && "Fair - The class was below average"}
              {rating === 3 && "Good - The class was satisfactory"}
              {rating === 4 && "Very Good - The class exceeded expectations"}
              {rating === 5 && "Excellent - The class was outstanding"}
            </p>
          </div>

          {/* Review Text Section */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-800">
              Share your experience *
            </label>
            <Textarea
              placeholder="Tell us about your experience with this class. What did you like? What could be improved? (Minimum 10 characters)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-blue-500"
              maxLength={500}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Share your thoughts to help improve our classes</span>
              <span>{review.length}/500</span>
            </div>
          </div>

          {/* Additional Feedback Section */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-800">
              Additional Feedback (Optional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Great teaching methods",
                "Engaging content",
                "Clear explanations",
                "Good pace",
                "Interactive activities",
                "Helpful materials",
                "Patient instructor",
                "Well organized"
              ].map((feedback) => (
                <label key={feedback} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{feedback}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0 || review.trim().length < 10}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Star className="w-4 h-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal; 