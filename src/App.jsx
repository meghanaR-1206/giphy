import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/applayout';
import Home from './pages/home';
import Category from './pages/category';
import Search from './pages/search';
import SingleGif from './pages/singleGif';
import Favorites from './pages/favorites';

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
