import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  MenuItem,
  IconButton,
  Stack,
  Popover,
  Select,
  InputLabel,
  FormControl,
  Input
} from '@mui/material';
import { US } from 'country-flag-icons/string/3x2';
import LoginI18n from '../../pages/Logini18n'; // Import the LoginI18n component

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'ro',
    label: 'Romanian',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/RO.svg'
  },
  {
    value: 'en',
    label: 'English',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg'
  },
  {
    value: 'ua',
    label: 'Ukrainian',
    icon: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/UA.svg'
  }
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { i18n } = useTranslation(); // Get the i18n object from useTranslation

  const handleChangeLanguage = (event) => {
    const languageCode = event?.target?.value;
    console.log('Event target', event?.target?.value);

    console.log('Selected language:', languageCode);
    i18n.changeLanguage(languageCode).then(() => {
      console.log('Language changed to:', languageCode);
    });
  };

  return (
    <FormControl
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75
          }
        }
      }}
    >
      <Select
        defaultValue="ro"
        onChange={handleChangeLanguage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            padding: 0,
            width: 44,
            height: 44,
            ...(open && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
            })
          }
        }}
      >
        <MenuItem value="ro">
          <Box component="img" alt={LANGS[0].label} src={LANGS[0].icon} sx={{ width: 28, mr: 2 }} />
        </MenuItem>
        <MenuItem value="en">
          <Box component="img" alt={LANGS[1].label} src={LANGS[1].icon} sx={{ width: 28, mr: 2 }} />
        </MenuItem>
        <MenuItem value="ua">
          <Box component="img" alt={LANGS[2].label} src={LANGS[2].icon} sx={{ width: 28, mr: 2 }} />
        </MenuItem>
      </Select>
    </FormControl>
  );
}
