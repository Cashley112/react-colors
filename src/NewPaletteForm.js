import React from 'react';
import { arrayMove } from 'react-sortable-hoc';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button'

import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';

export default function NewPaletteForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currColor, setColor] = React.useState('teal');
    const [colors, setColors] = React.useState(props.palettes[0].colors);
    const [newName, setName] = React.useState('');
    

    const defaultConfig = {
      maxColors: 20
    }
    const paletteIsFull = colors.length >= defaultConfig.maxColors;
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    const removeColor = name => {
      setColors(colors.filter(color => color.name !== name))
    }
    // drag and drop method
    const onSortEnd = ({oldIndex, newIndex}) => {
      setColors(arrayMove(colors, oldIndex, newIndex))
    };

    const clearPalette = () => {
      setColors([]);
    }

    const addRandomColor = () => {
      const allColors = props.palettes.map(p => p.colors).flat();
      let rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand];
      setColors([...colors, randomColor]);
    }

    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          colors={colors}
          history={props.history}
          savePalette={props.savePalette}
          palettes={props.palettes}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Divider />
          <div  className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.btns}>
              <Button
                variant='contained' 
                color='secondary'
                onClick={clearPalette}
                className={classes.btn}
              >
                Clear Palette
              </Button>
              <Button 
                variant='contained' 
                color='primary'
                onClick={addRandomColor}
                disabled={paletteIsFull}
                className={classes.btn}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm 
              maxColors={defaultConfig.maxColors}
              colors={colors}
              setColors={setColors}
              currColor={currColor}
              newName={newName}
              paletteIsFull={paletteIsFull}
              className={classes.picker}
            />
            </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={colors}
            removeColor={removeColor}
            axis='xy'
            onSortEnd={onSortEnd}
          />
        </main>
      </div>
    );
  }