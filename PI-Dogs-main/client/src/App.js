import './App.css';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';

function App() {
  return (
    <div className="App">
      <Route exact path='/'><LandingPage/></Route>
      <Route path='/home'><Home/></Route>
      <Route path='/dogs/:id'><DogDetail/></Route>
      <Route exact path='/dogs'><CreateDog/></Route>
    </div>
  );
}

export default App;
