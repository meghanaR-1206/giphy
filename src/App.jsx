import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

import Home from './pages/Home';
import Category from './pages/Category';
import Search from './pages/Search';
import SingleGif from './pages/SingleGif';
import Favorites from './pages/Favorites';

import './App.css';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/category/:categoryName',
        element: <Category />,
      },
      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '/:gif/:id',
        element: <SingleGif />,
      },
      {
        path: '/Favorites',
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
