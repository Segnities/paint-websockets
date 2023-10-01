import './App.scss';
import Canvas from "./components/Canvas";
import SettingsBar from './components/SettingsBar';
import ToolBar from './components/Toolbar';

function App() {
  return (
    <div className="app">
      <ToolBar/>
      <SettingsBar/>
      <Canvas/>
    </div>
  )
}

export default App;
