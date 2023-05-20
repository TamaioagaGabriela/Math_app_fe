// component
import { useTranslation } from 'react-i18next';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
function SidebarConfig() {
  const { t } = useTranslation();
  const sidebarConfig = [
    {
      title: t('Dashboard'),
      path: '/dashboard/app',
      icon: getIcon('eva:pie-chart-2-fill')
    },
    {
      title: t('Teorie'),
      path: '/dashboard/teorie',
      icon: getIcon('fluent:book-20-filled')
    },
    {
      title: t('Formule'),
      path: '/dashboard/formule',
      icon: getIcon('eva:file-text-fill')
    },
    {
      title: t('Exerciții'),
      path: '/dashboard/exercitii',
      icon: getIcon('fluent:clipboard-edit-20-regular')
    },
    {
      title: t('Teste'),
      path: '/dashboard/teste',
      icon: getIcon('fluent:clipboard-clock-20-regular')
    },
    {
      title: t('Exerciții greșite'),
      path: '/dashboard/exercitii_gresite',
      icon: getIcon('fluent:clipboard-error-20-regular')
    }
  ];

  return sidebarConfig;
}

export default SidebarConfig;
