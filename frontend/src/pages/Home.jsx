import ToolBar from "../components/ToolBar.jsx";
import SettingsBar from "../components/SettingsBar.jsx";
import Canvas from "../components/Canvas.jsx";
import EnterModal from "../components/EnterModal.jsx";

export default function Home() {

    return (
        <>
            <EnterModal/>
            <ToolBar/>
            <SettingsBar/>
            <Canvas/>
        </>
    );
}