import {
  mdiHandshake,
  mdiBriefcaseOutline,
  mdiCalendarCheck,
  mdiAccountGroupOutline,
  mdiSitemapOutline,
} from '@mdi/js'

export const ROUTER_SETTINGS: {
  [key: string]: {
    title: string
    icon: string
    childrens?: { title: string; icon: string }[]
  }
} = {
  clients: {
    title: 'Клиенты',
    icon: mdiHandshake,
  },
  distributors: {
    title: 'Дистрибьюторы',
    icon: mdiSitemapOutline,
  },
  projects: {
    title: 'Проекты',
    icon: mdiBriefcaseOutline,
  },
  tasks: {
    title: 'Задачи',
    icon: mdiCalendarCheck,
  },
  users: {
    title: 'Пользователи',
    icon: mdiAccountGroupOutline,
  },
}
