import "./App.css";
import Router from "./pages/Router";
import { Provider } from "react-redux";
import store from "./contexts/configStore";

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
