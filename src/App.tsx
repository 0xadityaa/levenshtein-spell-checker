import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="spell-checker-theme">
      <>
        <h1>Spell Checker</h1>
      </>
    </ThemeProvider>
  )
}

export default App
