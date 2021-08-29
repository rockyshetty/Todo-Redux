import logo from './logo.svg';
import './App.css';
import TodoApp from '../src/components/Todo/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePerson from '../src/components/Todo/CreatePerson';
import '@fortawesome/fontawesome-free/js/all.js';
// function App() {
//   return (
//     <div className="fluid">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
function App () {
  return <>
  <TodoApp/>
  {/* <CreatePerson/> */}
  </>
}
export default App;
