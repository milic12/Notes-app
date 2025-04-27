import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import "./App.css";
import TreeStructure from "./components/TreeStructure";

// Component to conditionally render the app title
function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;

  const showTitle = ["/", "/create", "/edit"].some(
    (route) => pathname === route || pathname.startsWith("/edit/")
  );

  return (
    <div className="container">
      <Link to="/tree" className="task1">
        Task 1
      </Link>
      {showTitle && <h1>Notes App</h1>}
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/create" element={<NoteEditor />} />
        <Route path="/edit/:noteId" element={<NoteEditor />} />
        <Route path="/tree" element={<TreeStructure />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppContent />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
