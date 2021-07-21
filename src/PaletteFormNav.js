import React, { useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'



function PaletteFormNav(props) {
    const { classes, open, handleDrawerOpen, colors } = props;
    const [newPaletteName, setPaletteName] = React.useState('');

    useEffect(() => {
      ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
        props.palettes.every(
          ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        ));
    })

    const handleChangePaletteName = evt => {
      setPaletteName(evt.target.value);
    }

    const savePalette = () => {
      const newPalette = {
        paletteName: newPaletteName,
        id: newPaletteName.toLowerCase().replace(/ /g, '-'), 
        colors
      }
      props.savePalette(newPalette);
      props.history.push('/');
    }

    return(
        <div>
          <CssBaseline />
          <AppBar
            position="fixed"
            color='default'
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Create A Palette
              </Typography>
              <ValidatorForm onSubmit={savePalette}>
                  <TextValidator 
                    label='Palette Name'
                    value={newPaletteName}
                    onChange={handleChangePaletteName}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter Palette Name', 'Palette Name Must Be Unique']}
                  />
                  <Button 
                    variant='contained'
                    type='submit' 
                    color='primary'
                  >
                      Save Palette
                  </Button>
                  <Link to='/'>
                    <Button 
                      variant='contained'
                      color='secondary'
                    >
                        Go Back
                    </Button>
                  </Link>
              </ValidatorForm>
            </Toolbar>
          </AppBar>
        </div>
    )
}

export default PaletteFormNav;