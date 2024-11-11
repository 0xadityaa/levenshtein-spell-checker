import { useState } from "react";
import { LevenshteinMatrix } from "./LevenshteinMatrix";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WordSuggestionsProps {
  originalWord: string;
  suggestions: Array<{
    word: string;
    distance: number;
    matrix: number[][];
  }>;
  onSelectSuggestion: (word: string) => void;
}

export function WordSuggestions({
  originalWord,
  suggestions,
  onSelectSuggestion,
}: WordSuggestionsProps) {
  const topSuggestions = suggestions.slice(0, 3);
  const [selectedWord, setSelectedWord] = useState(topSuggestions[0]?.word);

  const selectedSuggestion = topSuggestions.find(s => s.word === selectedWord);

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold mb-2">Suggestions for "{originalWord}"</h4>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Word</TableHead>
                <TableHead className="w-[30%]">Distance</TableHead>
                <TableHead className="w-[30%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSuggestions.map(({ word, distance }) => (
                <TableRow 
                  key={word}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${word === selectedWord ? 'bg-muted/50' : ''}`}
                  onClick={() => setSelectedWord(word)}
                >
                  <TableCell className="font-medium">{word}</TableCell>
                  <TableCell>{distance}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSuggestion(word);
                      }}
                      className="h-7 rounded-sm px-2"
                    >
                      Apply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedSuggestion && (
        <div>
          <h4 className="text-sm font-semibold mb-2">
            Edit Distance Matrix for "{selectedSuggestion.word}"
          </h4>
          <div className="rounded-md border p-2">
            <LevenshteinMatrix
              word={originalWord}
              comparison={selectedSuggestion.word}
              matrix={selectedSuggestion.matrix}
            />
          </div>
        </div>
      )}
    </div>
  );
}