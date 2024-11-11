import { SpellChecker } from "./components/SpellChecker";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="spell-checker-theme">
      <div className="min-h-screen bg-background">
        <SpellChecker />
      </div>
    </ThemeProvider>
  );
}

export default App;