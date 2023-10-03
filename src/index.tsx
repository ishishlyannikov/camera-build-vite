import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/app/app.tsx";
// import { Provider } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { store } from './components/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
       <App/>
  </React.StrictMode>

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ToastContainer/>
//       <App/>
//     </Provider>
//   </React.StrictMode>
);

