import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { palettes, classes } = this.props;
        return(
            <div className={this.props.classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Palette List</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                            <MiniPalette { ...palette } key={palette.id} goToPalette={() => this.goToPalette(palette.id)} deletePalette={this.props.deletePalette} />
                        ))}
                    </div>
                </div>  
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);