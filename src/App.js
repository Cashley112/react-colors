import Palette from './Palette';
import { Route, Switch } from 'react-router-dom';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
  console.log(generatePalette(seedColors[4]))
  return (
    <Switch>
      <Route exact path='/' render={() => <h1>Palette List Goes Here</h1>} />
      <Route exact path='/palette/:id' render={() => <h1>Palette List Goes Here</h1>} />
    </Switch>
  );
}

export default App;
