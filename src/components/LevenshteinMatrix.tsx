import { cn } from "@/lib/utils";

interface LevenshteinMatrixProps {
  word: string;
  comparison: string;
  matrix: number[][];
}

export function LevenshteinMatrix({ word, comparison, matrix }: LevenshteinMatrixProps) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="p-1.5 sm:p-2 border bg-muted"></th>
                <th className="p-1.5 sm:p-2 border bg-muted"></th>
                {comparison.split('').map((char, i) => (
                  <th key={i} className="p-1.5 sm:p-2 border bg-muted font-mono">
                    {char}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  <th className="p-1.5 sm:p-2 border bg-muted font-mono">
                    {i === 0 ? '' : word[i - 1]}
                  </th>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        "p-1.5 sm:p-2 border text-center font-mono",
                        i > 0 && j > 0 && word[i - 1] === comparison[j - 1]
                          ? "bg-green-100 dark:bg-green-900/50"
                          : "bg-card"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}