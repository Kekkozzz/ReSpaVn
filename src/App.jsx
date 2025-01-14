import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from './routes/Routes';
import SessionContextProvider from "./context/SessionContextProvider";

function App() {
  return (
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  );
}

export default App;
