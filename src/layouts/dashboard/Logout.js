import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
// ----------------------------------------------------------------------

export default function Lougout() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <IconButton
      ref={anchorRef}
      onClick={handleOpen}
      sx={{
        padding: 0,
        width: 44,
        height: 44,
        ...(open && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
        })
      }}
    >
      <Logout />
    </IconButton>
  );
}
