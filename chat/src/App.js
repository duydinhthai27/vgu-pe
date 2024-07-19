import "./App.css";
import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./components/context/AuthProvider";
import AppProvider from "./components/context/AppProvider";
import AddRoomModal from "./components/Models/AddRoomModal";
import InviteMemberModal from "./components/Models/inviteMemberModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<ChatRoom />} path="/" />
        </Routes>{" "}
        <AddRoomModal/>
        <InviteMemberModal/>
        </AppProvider>
      </AuthProvider>{" "}
    </BrowserRouter>
  );
}

export default App;
