# 🔍 Levenshtein Spell Checker

A visual implementation of the Levenshtein Distance algorithm for spell checking, built with React and TypeScript. See the algorithm in action as it suggests corrections for misspelled words!

## ✨ Features

- **Real-time spell checking** with word suggestions
- **Interactive visualization** of the Levenshtein Distance matrix
- **Dark mode support** for comfortable viewing
- **Responsive design** works on desktop and mobile
- **Educational tool** for understanding edit distance algorithms

## 🛠️ Built With

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [ShadCn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/0xadityaa/levenshtein-spell-checker.git
```

2. Navigate to the project directory
```bash
cd levenshtein-spell-checker
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view it in your browser

## 🎯 Usage

1. Type or paste your text in the input field
2. Misspelled words will be highlighted automatically
3. Click on a highlighted word to see suggested corrections
4. View the Levenshtein Distance matrix to understand how the algorithm works

## 📝 How It Works

The spell checker uses the Levenshtein Distance algorithm to find similar words. The algorithm calculates the minimum number of single-character edits required to change one word into another.

```typescript
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];
  // Matrix initialization
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }
  
  // Calculate minimum edits
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1], // substitution
          matrix[i][j - 1],     // insertion
          matrix[i - 1][j]      // deletion
        ) + 1;
      }
    }
  }
  
  return matrix[str1.length][str2.length];
}
```

Demo Link: [https://levenshtein-spell-checker.vercel.app/](https://levenshtein-spell-checker.vercel.app/)

---

⭐️ Star this repo if you found it helpful!