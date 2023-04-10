import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Route exact path="/chats">
        <ChatPage />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
