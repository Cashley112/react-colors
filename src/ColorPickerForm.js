import React, {useEffect} from 'react';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import styles from './styles/ColorPickerFormStyles';

function ColorPickerForm(props) {
    const { colors, classes, setColors, paletteIsFull } = props;
    const [currColor, setColor] = React.useState('teal');
    const [newName, setName] = React.useState('');

    useEffect(() => {
      ValidatorForm.addValidationRule('isColorNameUnique', value => 
        colors.every(
          ({ name }) => name.toLowerCase() !== value.toLowerCase()
        ));
      ValidatorForm.addValidationRule('isColorUnique', value => 
        colors.every(
          ({ color }) => color !== currColor
        ));
    });

    const updateCurrColor = newColor => {
        setColor(newColor.hex);
      }
  
      const addNewColor = () => {
        setColors([ ...colors, { color: currColor, name: newName } ]);
        setName('');
      }
  
      const handleChangeColorName = evt => {
        setName(evt.target.value);
      }

    return(
        <div className={classes.root}>
            <ChromePicker
                color={currColor}
                onChangeComplete={updateCurrColor}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={addNewColor}>
                <TextValidator
                className={classes.colorNameInput} 
                variant='filled'
                placeholder='Color Name'
                margin='normal'
                value={newName} 
                onChange={handleChangeColorName} 
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['this field is required', 'color name must be unique', 'color already used']}
                />
                <Button 
                className={classes.addColor}
                variant='contained'
                type='submit' 
                color='primary' 
                style={{ backgroundColor: paletteIsFull ? 'grey' : currColor }} 
                disabled={paletteIsFull}
                >
                {paletteIsFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(ColorPickerForm);