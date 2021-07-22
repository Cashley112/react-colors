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

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navForm: {
    marginLeft: 'auto',
    '& div': {
      margin: 'auto'
    },
    '& button': {
      margin: 'auto'
    }
  }
}));

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
          <Typography variant='h4'>
            Design Your Palette
          </Typography>
          <div>
            <Button
              variant='contained' 
              color='secondary'
              onClick={clearPalette}
            >
              Clear Palette
            </Button>
            <Button 
              variant='contained' 
              color='primary'
              onClick={addRandomColor}
              disabled={paletteIsFull}
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
          />
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