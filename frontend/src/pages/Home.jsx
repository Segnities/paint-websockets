import ToolBar from "../components/ToolBar.jsx";
import SettingsBar from "../components/SettingsBar.jsx";
import Canvas from "../components/Canvas.jsx";

export default function Home() {
    return (
        <>
            <ToolBar/>
            <SettingsBar/>
            <Canvas/>
        </>
    );
}