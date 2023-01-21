import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TopRepos, { loader as topReposLoader } from './components/TopRepos';
import Root, { action as rootAction } from './root';
import ProfileInfo, { loader as profileLoader } from './Routes/ProfileInfo';
import ErrorElement from './Routes/ErrorElement';
import Index, { loader as IndexRepoLoader } from './Routes/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: rootAction,
    errorElement: <ErrorElement />
  }
  ,
  {
    path: "/user/:username",
    element: <ProfileInfo />,
    loader: profileLoader,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          {
            index: true, element: <Index />,
            loader: IndexRepoLoader,
          },
          {
            path: '/user/:username/repos',
            element: <TopRepos />,
            loader: topReposLoader,
          }
        ]
      },
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
