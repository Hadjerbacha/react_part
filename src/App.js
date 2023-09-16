import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Page1 from "./pages/page1"; 
import Page2 from "./pages/page2";
import Signup from "./pages/Singup";
import Archive from "./pages/archive";
import Consulte from "./pages/consulte";
import Statistiques from "./pages/tableau_bord";
import Adduser from "./pages/adduser";

function App() {
	const user = localStorage.getItem("token");
	return (
		<Routes>
			{user && <Route path="/" exact element={<Page1 />} />}
			<Route path="/page2" exact element={<Page2 />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/archive" exact element={<Archive />} />
			<Route path="/consulte" exact element={<Consulte />} />
			<Route path="/tableau_de_bord" exact element={<Statistiques />} />
			<Route path="/" element={<Navigate replace to="/login" />} /> 
			<Route path="/adduser" exact element={<Adduser />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}
 
export default App;