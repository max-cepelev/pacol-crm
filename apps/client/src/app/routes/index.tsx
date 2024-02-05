import {
	mdiAccountGroupOutline,
	mdiAccountTie,
	mdiBriefcaseOutline,
	mdiCalculator,
	mdiCalendarCheck,
	mdiFileTable,
	mdiHandshake,
	mdiSitemapOutline,
} from '@mdi/js';
import { RouteObject } from 'react-router-dom';
import App from '..';
import ProtectedRoute from '../features/ProtectedRoute';
import CatalogPage from './CatalogPage';
import ClientPage from './ClientPage';
import ClientsPage from './ClientsPage';
import ContactsPage from './ContactsPage';
import DistributorPage from './DistributorPage';
import DistributorsPage from './DistributorsPage';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import NoActivate from './NoActivate';
import ProjectsPage from './ProjectsPage';
import SalesPage from './SalesPage';
import TasksPage from './TasksPage';
import UsersPage from './UsersPage';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <MainPage />,
				index: true,
			},
			{
				path: 'distributors',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'USER']}
						children={<DistributorsPage />}
					/>
				),
				handle: {
					title: 'Дистрибьюторы',
					icon: mdiSitemapOutline,
					roles: ['ADMIN', 'USER'],
				},
			},
			{
				path: 'clients',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<ClientsPage />}
					/>
				),
				handle: {
					title: 'Клиенты',
					icon: mdiHandshake,
					roles: ['ADMIN', 'DISTRIBUTOR', 'USER'],
				},
			},
			{
				path: 'clients/:id',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<ClientPage />}
					/>
				),
			},
			{
				path: 'contacts',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<ContactsPage />}
					/>
				),
				handle: {
					title: 'Контакты',
					icon: mdiAccountTie,
					roles: ['ADMIN', 'DISTRIBUTOR', 'USER'],
				},
			},
			{
				path: 'distributors/:id',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<DistributorPage />}
					/>
				),
			},
			{
				path: 'catalog',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<CatalogPage />}
					/>
				),
				handle: {
					title: 'Каталог',
					icon: mdiFileTable,
					roles: ['ADMIN', 'DISTRIBUTOR', 'USER'],
				},
			},
			{
				path: 'projects',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<ProjectsPage />}
					/>
				),
				handle: {
					title: 'Проекты',
					icon: mdiBriefcaseOutline,
					roles: ['ADMIN', 'DISTRIBUTOR', 'USER'],
				},
			},
			{
				path: 'sales',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<SalesPage />}
					/>
				),
				handle: {
					title: 'Продажи',
					icon: mdiCalculator,
					roles: ['ADMIN', 'DISTRIBUTOR', 'USER'],
				},
			},
			{
				path: 'tasks',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN', 'DISTRIBUTOR', 'USER']}
						children={<TasksPage />}
					/>
				),
				handle: {
					title: 'Задачи',
					icon: mdiCalendarCheck,
					roles: ['ADMIN', 'DISTRIBUTOR', 'USER'],
				},
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'users',
				element: (
					<ProtectedRoute
						accessRoles={['ADMIN']}
						children={<UsersPage />}
					/>
				),
				handle: {
					title: 'Пользователи',
					icon: mdiAccountGroupOutline,
					roles: ['ADMIN'],
				},
			},
			{
				path: 'no-activate',
				element: <NoActivate />,
			},
		],
	},
];
