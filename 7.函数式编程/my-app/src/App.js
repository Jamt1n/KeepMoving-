import './App.css';
import {connect} from 'react-redux';
import {add,minus} from './redux.js';

function App(props) {
  let {num,dispatch} = props;
  return (
    <div className="App">
      <button onClick={()=>dispatch(add(2))}>点击加</button>
      <span>{num}</span>
      <button onClick={()=>dispatch(minus(1))}>点击减</button>
    </div>
  );
}
App = connect(state=>state)(App);
export default App;
