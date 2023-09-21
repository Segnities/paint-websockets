import './App.scss'
import SettingsBar from './components/SettingsBar';
import ToolBar from './components/Toolbar';
import Canvas from "./components/Canvas";

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
