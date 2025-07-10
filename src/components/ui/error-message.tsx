
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div className={cn(
      "text-sm text-red-600 dark:text-red-400 mt-1 flex items-center space-x-1",
      className
    )}>
      <span className="text-red-500">⚠️</span>
      <span>{message}</span>
    </div>
  );
};
