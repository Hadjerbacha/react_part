import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Page1 from "./pages/page1"; 
import Page2 from "./pages/page2";
import Signup from "./pages/Singup";
import Adduser from "./pages/adduser";
import ArchivePage from "./pages/archive";
function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Page1 />} />}
			<Route path="/page2" exact element={<Page2 />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/adduser" exact element={<Adduser />} />
			<Route path="/archive" exact element={<ArchivePage />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}
 
export default App;