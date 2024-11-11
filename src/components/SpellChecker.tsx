import { useState, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { findSuggestions } from "@/lib/dictionary";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Pen, CheckCircle2 } from "lucide-react";
import { WordSuggestions } from "./WordSuggestions";
import { ThemeToggle } from "./theme-toggle";
import confetti from 'canvas-confetti';

interface WordAnalysis {
  word: string;
  startIndex: number;
  endIndex: number;
  suggestions: Array<{
    word: string;
    distance: number;
    matrix: number[][];
  }>;
}

interface Correction {
  originalWord: string;
  correctedWord: string;
  editDistance: number;
}

export function SpellChecker() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<WordAnalysis[]>([]);
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [allCorrect, setAllCorrect] = useState(false);

  const analyzeText = useCallback((inputText: string) => {
    const words = inputText.match(/\b\w+\b/g) || [];
    const newAnalysis: WordAnalysis[] = [];
    let currentIndex = 0;

    words.forEach(word => {
      const startIndex = inputText.indexOf(word, currentIndex);
      const endIndex = startIndex + word.length;
      const suggestions = findSuggestions(word);
      
      if (suggestions.length > 0 && suggestions[0].distance > 0) {
        newAnalysis.push({
          word,
          startIndex,
          endIndex,
          suggestions
        });
      }
      currentIndex = endIndex;
    });

    setAnalysis(newAnalysis);
    setAllCorrect(newAnalysis.length === 0 && inputText.trim().length > 0);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    analyzeText(newText);
  };

  const replaceWord = (oldWord: string, newWord: string) => {
    const newText = text.replace(new RegExp(`\\b${oldWord}\\b`), newWord);
    setText(newText);
    
    setCorrections(prev => [...prev, {
      originalWord: oldWord,
      correctedWord: newWord,
      editDistance: findSuggestions(oldWord)[0].distance
    }]);
    
    analyzeText(newText);
  };

  useEffect(() => {
    if (allCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [allCorrect]);

  const renderTextWithHighlights = () => {
    if (analysis.length === 0) return text;

    let lastIndex = 0;
    const elements: JSX.Element[] = [];

    analysis.forEach((item, idx) => {
      if (item.startIndex > lastIndex) {
        elements.push(
          <span key={`text-${idx}`}>
            {text.slice(lastIndex, item.startIndex)}
          </span>
        );
      }

      elements.push(
        <HoverCard key={`word-${idx}`} openDelay={100} closeDelay={200}>
          <HoverCardTrigger asChild>
            <span className="border-b-2 border-red-500 border-dotted cursor-help">
              {text.slice(item.startIndex, item.endIndex)}
            </span>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-[calc(100vw-2rem)] sm:w-[340px] md:w-[400px] lg:w-[480px]"
            align="start"
            side="bottom"
            sideOffset={5}
          >
            <WordSuggestions
              originalWord={item.word}
              suggestions={item.suggestions}
              onSelectSuggestion={(newWord) => replaceWord(item.word, newWord)}
            />
          </HoverCardContent>
        </HoverCard>
      );

      lastIndex = item.endIndex;
    });

    if (lastIndex < text.length) {
      elements.push(
        <span key="text-final">{text.slice(lastIndex)}</span>
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Pen className="h-6 w-6 sm:h-8 sm:w-8" />
                Levenshtine's Spell Checker
                </h1>
                <ThemeToggle />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              💡 - Implementation of a basic spell checker that uses levenshtine's algorithm to find similar words based on distence of editing.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              🛠️ - Red underlined words might be misspelled - hover over them to see suggestions and view how different each suggestion is from your word. you can select on each suggested word to visualize it's logic.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              ✍️ - Get summary of edits after applying changes.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <Textarea
            placeholder="Type or paste your text here... make sure to have some spelling mistakes 😉"
            className="min-h-[200px] font-mono text-sm sm:text-base"
            value={text}
            onChange={handleTextChange}
          />
          <Card className="p-3 sm:p-4">
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base break-words">
              {renderTextWithHighlights()}
            </div>
          </Card>

          {allCorrect && text.trim().length > 0 && (
            <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Perfect! All spellings are correct.</span>
              </div>
            </Card>
          )}

          {corrections.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Correction Summary</h3>
              <div className="space-y-2">
                {corrections.map((correction, index) => (
                  <div key={index} className="text-sm flex items-center gap-2">
                    <span className="text-red-500 line-through">{correction.originalWord}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-green-600 dark:text-green-400">{correction.correctedWord}</span>
                    <span className="text-muted-foreground ml-auto">
                      Edit Distance: {correction.editDistance}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}