
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MemoryPalaceGame } from "@/components/games/MemoryPalaceGame";
import { NumberDetectiveGame } from "@/components/games/NumberDetectiveGame";
import { StoryBuilderGame } from "@/components/games/StoryBuilderGame";
import { MathSprintGame } from "@/components/games/MathSprintGame";
import { SanskritMantraGame } from "@/components/games/SanskritMantraGame";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: string;
  onGameComplete: (score: number, stars: number) => void;
}

export const GameModal = ({ isOpen, onClose, gameType, onGameComplete }: GameModalProps) => {
  const getGameComponent = () => {
    switch (gameType) {
      case 'memory-palace':
        return <MemoryPalaceGame onComplete={onGameComplete} />;
      case 'number-detective':
        return <NumberDetectiveGame onComplete={onGameComplete} />;
      case 'story-builder':
        return <StoryBuilderGame onComplete={onGameComplete} />;
      case 'math-sprint':
        return <MathSprintGame onComplete={onGameComplete} />;
      case 'sanskrit-mantra':
        return <SanskritMantraGame onComplete={onGameComplete} />;
      default:
        return (
          <div className="p-4 sm:p-6 text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-lg font-bold text-gray-700 mb-2">Coming Soon!</h3>
            <p className="text-gray-600 mb-4">This game is under development.</p>
          </div>
        );
    }
  };

  const getGameTitle = () => {
    switch (gameType) {
      case 'memory-palace':
        return 'Memory Palace';
      case 'number-detective':
        return 'Number Detective';
      case 'story-builder':
        return 'Story Builder';
      case 'math-sprint':
        return 'Math Sprint';
      case 'sanskrit-mantra':
        return 'Sanskrit Mantra';
      default:
        return 'Game';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl h-[90vh] max-h-[90vh] overflow-y-auto p-0 sm:p-6">
        <DialogHeader className="p-4 sm:p-0 pb-2 sm:pb-4">
          <DialogTitle className="text-lg sm:text-xl">{getGameTitle()}</DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-y-auto">
          {getGameComponent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
