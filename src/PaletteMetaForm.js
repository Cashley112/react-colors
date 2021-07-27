import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';

export default function PaletteMetaForm(props) {
    const { colors, hideForm } = props;
    const [open, setOpen] = React.useState(true);
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

    return (
            <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
                <ValidatorForm onSubmit={savePalette}>
                <DialogContent>
                <DialogContentText>
                    Please Enter A Name for Your New, Beautiful Palette. Make Sure It Is Unique!
                </DialogContentText>
                  <Picker />
                  <TextValidator 
                    label='Palette Name'
                    value={newPaletteName}
                    onChange={handleChangePaletteName}
                    validators={['required', 'isPaletteNameUnique']}
                    errorMessages={['Enter Palette Name', 'Palette Name Must Be Unique']}
                    fullWidth
                    margin='normal'
                  />
                </DialogContent>
                <DialogActions>
                <Button onClick={hideForm} color="primary">
                    Cancel
                </Button>
                <Button 
                    variant='contained'
                    type='submit' 
                    color='primary'
                  >
                      Save Palette
                  </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
    )
}