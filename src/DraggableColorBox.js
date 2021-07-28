import React from 'react';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement((props) => {
    const { classes, color, name, removeColor } = props;

    const handleColorRemove = () => {
        removeColor(name)
    }

    return (
        <div 
            className={classes.root} 
            style={{ backgroundColor: color }}
        >
            <div className={classes.boxContent}>
                <span>{props.name}</span>
                <DeleteIcon 
                    className={classes.deleteIcon}
                    onClick={handleColorRemove}
                />
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);

