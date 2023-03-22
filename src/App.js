import Router from "./pages/Router";
import { Provider } from "react-redux";
import store from "./contexts/configStore";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
