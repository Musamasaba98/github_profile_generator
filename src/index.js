import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TopRepos, { loader as topReposLoader } from './components/TopRepos';
import Root, { action as rootAction } from './root';
import ProfileInfo, { loader as profileLoader } from './Routes/ProfileInfo';
import { action as sortAction } from './components/Sort'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: rootAction,
  }
  ,
  {
    path: "/user/:username",
    element: <ProfileInfo />,
    loader: profileLoader,
    children: [
      {
        path: '/user/:username/repos',
        element: <TopRepos />,
        loader: topReposLoader,
      },
      {
        path: "/user/:username/repos",
        action: sortAction
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>
);
