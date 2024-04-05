import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Customer-Service-Layout";
import ComplaintsContainer from "./Complaints-component/ComplaintsContainer";
import Reply from "./Complaints-component/Reply";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/complaints",
          element: <ComplaintsContainer />,
        },
        {
          path: "/reply",
          element: <Reply />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
