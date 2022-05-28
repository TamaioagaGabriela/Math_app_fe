import React, { useRef, useState, Component } from 'react';

// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, Button } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import AuthContext from '../../context/auth-context';

// ----------------------------------------------------------------------

const CLASE = [
  {
    value: '5',
    label: 'Clasa a 5-a'
  },
  {
    value: '6',
    label: 'Clasa a 6-a'
  },
  {
    value: '7',
    label: 'Clasa a 7-a'
  },
  {
    value: '8',
    label: 'Clasa a 8-a'
  },
  {
    value: '9',
    label: 'Clasa a 9-a'
  },
  {
    value: '10',
    label: 'Clasa a 10-a'
  },
  {
    value: '11',
    label: 'Clasa a 11-a'
  },
  {
    value: '12',
    label: 'Clasa a 12-a'
  }
];

// ----------------------------------------------------------------------

class ClasaPopover extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.anchorRef = React.createRef();
    // const [clasa, setClasa] = useState('0');
    this.state = {
      open: false
      //   anchorRef: useRef(null)
    };
  }

  //   handleOpen = () => {
  //     this.setState({ open: true });
  //   };

  //   handleClose = () => {
  //     this.setState({ open: false });
  //   };

  //   handleClick2 = () => {
  //     // console.log('####', val);
  //     this.setState({ open: false });
  //   };

  render() {
    // console.log(this.state.open);
    // console.log(this.state.anchorRef);
    return (
      <>
        <Button
          ref={this.anchorRef}
          onClick={() => this.setState({ open: true })}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(this.state.open && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
            })
          }}
        >
          Alege clasa
        </Button>

        <MenuPopover
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          anchorEl={this.anchorRef.current}
        >
          <Box sx={{ py: 1 }}>
            {CLASE.map((option) => (
              <MenuItem
                key={option.value}
                selected={option.value === CLASE[0].value}
                onClick={() => {
                  this.context.clasa = option.value;
                }}
                // clasaValue={option.value}
                sx={{ py: 1, px: 2.5 }}
              >
                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                  {option.label}
                </ListItemText>
              </MenuItem>
            ))}
          </Box>
        </MenuPopover>
      </>
    );
  }
}

ClasaPopover.contextType = AuthContext;
export default ClasaPopover;
