import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from './routes/Routes';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
