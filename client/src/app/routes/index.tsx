import { RouteObject } from 'react-router-dom'
import App from '..'
import CategoriesPage from './CategoriesPage'
import ClientsPage from './ClientsPage'
import DistributorPage from './DistributorPage'
import DistributorsPage from './DistributorsPage'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import ProjectsPage from './ProjectsPage'
import TasksPage from './TasksPage'
import UsersPage from './UsersPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <MainPage />,
        index: true,
      },
      {
        path: 'clients',
        element: <ClientsPage />,
      },
      {
        path: 'distributors',
        element: <DistributorsPage />,
      },
      {
        path: 'distributors/:id',
        element: <DistributorPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'tasks',
        element: <TasksPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]
