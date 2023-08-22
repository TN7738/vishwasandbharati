import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./components/Home";
import Body from "./components/Body";
import Rsvp from "./components/Rsvp";
import Login from "./components/Login";

const appRouter = createHashRouter([
	{
		path: '/',
		element: <Body/>,
		children: [
			{
				path: '/',
				element: <Home/>
			},
			{
				path: '/rsvp',
				element: <Rsvp/>
			},
			{
				path: '/login',
				element: <Login/>
			}
		]
	}
])

function App() {
	return (
		<div className="App">
			<RouterProvider router={appRouter} />
		</div>
	);
}

export default App;
	