// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'teorie',
    path: '/dashboard/teorie',
    icon: getIcon('fluent:book-20-filled')
  },
  {
    title: 'formule',
    path: '/dashboard/formule',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'exercitii',
    path: '/dashboard/exercitii',
    icon: getIcon('fluent:clipboard-edit-20-regular')
  },
  {
    title: 'teste',
    path: '/dashboard/teste',
    icon: getIcon('fluent:clipboard-clock-20-regular')
  },
  {
    title: 'exercitii gresite',
    path: '/dashboard/exercitii_gresite',
    icon: getIcon('fluent:clipboard-error-20-regular')
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill')
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  }
];

export default sidebarConfig;
