import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import route from "./routes"
import { Provider } from "react-redux";
import store from "./app/store";


function App() {
  const appRoute = createBrowserRouter(route);
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <RouterProvider router={appRoute} />
      </Provider>
    </>
  )
}

export default App
