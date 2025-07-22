import React, { useState, useEffect } from "react";
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
import { Star, BookOpen, Calendar, Clock, Users, X, CheckCircle } from "lucide-react";
import { authService } from "@/services";
import { FeedbackSubmission, FeedbackData } from "@/lib/interface/auth";
import { useToast } from "@/hooks/use-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: {
    admin_class_name: string;
    class_date: string;
    start_time: string;
    end_time: string;
    child_name: string;
    classschedule_id: number;
    class_id: number;
    parent_id: number;
    schedulebooking_id: number;
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
  const [isLoading, setIsLoading] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState<FeedbackData | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { toast } = useToast();

  const initialFeedbackOptions = {
    engagement: false,
    learning: false,
    instructor: false,
    classroom_platform: false,
    low_on_learning: false,
    low_on_engagement: false,
    instructor_not_prepared: false,
    system_issues: false,
  };

  const [feedbackOptions, setFeedbackOptions] = useState(initialFeedbackOptions);

  // Load existing feedback when modal opens
  useEffect(() => {
    if (isOpen && classData.classschedule_id) {
      loadExistingFeedback();
    }
  }, [isOpen, classData.classschedule_id]);

  const loadExistingFeedback = async () => {
    setIsLoading(true);
    try {
      const result = await authService.getFeedback(classData.classschedule_id);
      if (result.status && result.data) {
        setExistingFeedback(result.data);
        setRating(result.data.rating || 0);
        setReview(result.data.other || "");
        setFeedbackSubmitted(true);
      }
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const formatTime = (startTime: string, endTime: string) => `${startTime} - ${endTime}`;

  // Handler for feedback option checkboxes
  const handleFeedbackOptionChange = (option: keyof typeof feedbackOptions) => {
    setFeedbackOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Error", description: "Please select a star rating.", variant: "destructive" });
      return;
    }
    if (review.trim().length < 1) {
      toast({ title: "Error", description: "Please write a review .", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const feedbackData: FeedbackSubmission = {
        classschedule_id: classData.classschedule_id,
        class_id: classData.class_id,
        parent_id: classData.parent_id,
        classschedulebooking_id: classData.schedulebooking_id,
        type: "class_feedback",
        rating: rating,
        other: review.trim(),
        ready_to_enroll: "Yes",

        // Map liked options: true -> "Yes", false -> null
        engagement: feedbackOptions.engagement ? "Yes" : null,
        learning: feedbackOptions.learning ? "Yes" : null,
        instructor: feedbackOptions.instructor ? "Yes" : null,
        classroom_platform: feedbackOptions.classroom_platform ? "Yes" : null,

        // Map improvement options: true -> "Yes", false -> null
        low_on_learning: feedbackOptions.low_on_learning ? "Yes" : null,
        low_on_engagement: feedbackOptions.low_on_engagement ? "Yes" : null,
        instructor_not_prepared: feedbackOptions.instructor_not_prepared ? "Yes" : null,
        system_issues: feedbackOptions.system_issues ? "Yes" : null,
      };

      const result = await authService.submitFeedback(feedbackData);
      
      if (result.status) {
        toast({ title: "Success", description: "Feedback submitted successfully!" });
        setFeedbackSubmitted(true);
        onClose();
      } else {
        toast({ title: "Error", description: result.msg || "Failed to submit feedback.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit feedback. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0);
      setReview("");
      setFeedbackOptions(initialFeedbackOptions);
      setExistingFeedback(null);
      setFeedbackSubmitted(false);
      onClose();
    }
  };

  // Loading State View
  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Class Review
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading feedback...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Submitted Feedback View
  if (existingFeedback && feedbackSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Feedback Already Submitted
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
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

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Your Feedback</h3>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Rating:</label>
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= existingFeedback.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({existingFeedback.rating}/5)
                      </span>
                    </div>
                  </div>

                  {existingFeedback.other && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Your Comments:</label>
                      <div className="mt-1 p-3 bg-white rounded-md border border-gray-200">
                        <p className="text-gray-800">{existingFeedback.other}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="pt-6">
            <Button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Main Form View
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

          <div className="space-y-3">
            <label htmlFor="review-textarea" className="text-lg font-semibold text-gray-800">
              Share your experience *
            </label>
            <Textarea
              id="review-textarea"
              placeholder="Tell us about your experience with this class. What did you like? What could be improved?"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-800">
                👍 What you liked
              </label>
              <div className="space-y-2">
                {[
                  { key: 'engagement', label: 'Student Engagement' },
                  { key: 'learning', label: 'Learning Outcome' },
                  { key: 'instructor', label: 'Instructor Quality' },
                  { key: 'classroom_platform', label: 'Platform Experience' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={feedbackOptions[key as keyof typeof feedbackOptions]}
                      onChange={() => handleFeedbackOptionChange(key as keyof typeof feedbackOptions)}
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-800">
                🤔 What needs to be improved
              </label>
              <div className="space-y-2">
                {[
                  { key: 'low_on_engagement', label: 'Low Engagement' },
                  { key: 'low_on_learning', label: 'Low Learning' },
                  { key: 'instructor_not_prepared', label: 'Instructor Unprepared' },
                  { key: 'system_issues', label: 'Technical/System Issues' },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={feedbackOptions[key as keyof typeof feedbackOptions]}
                      onChange={() => handleFeedbackOptionChange(key as keyof typeof feedbackOptions)}
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
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