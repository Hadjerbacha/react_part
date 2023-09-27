import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tablepage from "./pages/TablePage"; 
import Prestataire from "./pages/prestataire";
import Singup from "./pages/Singup";
import Adduser from "./pages/adduser";
import Archive from "./pages/archive";
import Consulte from "./pages/consulte";
import Statistiques from "./pages/tableau_bord";
import ArchiveUser from "./pages/archiveUser";
import Fournisseur from "./pages/fournisseur";
function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Tablepage />} />}
			<Route path="/prestataire" exact element={<Prestataire />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/singup" exact element={<Singup />} />
			<Route path="/adduser" exact element={<Adduser />} />
			<Route path="/archive" exact element={<Archive />} />
			<Route path="/archiveUser" exact element={<ArchiveUser />} />
			<Route path="/consulte" exact element={<Consulte />} />
			<Route path="/fournisseur" exact element={<Fournisseur />} />
			<Route path="/tableau_de_bord" exact element={<Statistiques />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/prestataire" element={<Navigate replace to="/login" />} />
			{user && <Route path="/consulte" exact element={<Consulte />} />}
		</Routes>
	);
}
 
export default App;