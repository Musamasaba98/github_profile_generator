import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TopRepos, { loader as topRepoLoader } from './components/TopRepos';
import Root, { action as rootAction } from './root';
import ProfileInfo, { loader as profileLoader } from './Routes/ProfileInfo';

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
        path: '/user/:username',
        element: <TopRepos />,
        loader: topRepoLoader
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
