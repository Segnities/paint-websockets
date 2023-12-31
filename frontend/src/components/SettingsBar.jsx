import toolState from "../store/toolState.js";

function SettingsBar() {
    return (
        <div className="settings-bar toolbar">
            <div className='l-width'>
                <label htmlFor="lv">Line width</label>
                <input
                    defaultValue={1}
                    id='lw'
                    type="number"
                    min={1}
                    max={50}
                    onChange={e => toolState.setLineWidth(e.target.value)}
                />
            </div>
            <div className="stroke-color">
                <label htmlFor="strk-color">Stroke color</label>
                <input
                    id="strk-color"
                    type="color"
                    onChange={e => toolState.setFillStroke(e.target.value)}

                />
            </div>
        </div>
    )
}

export default SettingsBar;