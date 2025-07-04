import Container from "./components/container/Container.tsx";
import Chat from "./pages/chat/Chat.tsx";
import Home from "./pages/home/Home.tsx";
import usePageStore from "./store/page.store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";

import "./App.css";

function App() {
  const queryClient = new QueryClient();
  const page = usePageStore((state) => state.currentPage);

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        {page === "home" && (
          <ErrorBoundary fallback={<div>Home failed to load</div>}>
            <Home />
          </ErrorBoundary>
        )}
        {page === "chat" && (
          <ErrorBoundary fallback={<div>Chat failed to load</div>}>
            <Chat />
          </ErrorBoundary>
        )}
      </Container>
    </QueryClientProvider>
  );
}

export default App;
