import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { DrawPage } from "./components/DrawPage";
import { LoadingPage } from "./components/LoadingPage";
import { LoginPage } from "./components/LoginPage";
import { useSecretSantaState } from "./hooks/useSecretSantaState";
import "./App.css";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const state = useSecretSantaState();

  // Afficher la page de loading pendant 4 secondes au démarrage
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Si en chargement, afficher la page de loading
  if (isLoading) {
    return (
      <LoadingPage
        onLoadingComplete={() => setIsLoading(false)}
        backgroundImage="/house.jpg"
      />
    );
  }

  // Si le tirage a été effectué et l'utilisateur n'est pas connecté, afficher la page de login
  if (state.hasDrawn && !state.currentUser) {
    return (
      <LoginPage
        participants={state.participants}
        onLogin={state.login}
        hasDrawn={state.hasDrawn}
      />
    );
  }

  // Si l'utilisateur est connecté après un tirage, afficher DrawPage avec restriction
  if (state.hasDrawn && state.currentUser) {
    return (
      <DrawPage
        participants={state.participants}
        draws={state.draws}
        hasDrawn={state.hasDrawn}
        onPerformDraw={state.performDraw}
        onResetDraw={state.resetDraw}
        currentUser={state.currentUser}
        onLogout={state.logout}
        isUserLoggedIn={true}
      />
    );
  }

  return (
    <HomePage
      participants={state.participants}
      onPerformDraw={state.performDraw}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
