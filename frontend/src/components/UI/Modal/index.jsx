import classnames from "classnames";

import CloseIcon from "./assets/icons/x-lg.svg"
import "./assets/scss/styles.scss";

export default function Modal(props) {
    const rootClass = classnames({
        "m-root-section": true,
        "active-modal": props?.show
    });
    return (
        <div className={rootClass}>
            <div className="m-window">
                <div className="close">
                    <img
                        src={CloseIcon}
                        onDragStart={(e) => e.preventDefault()}
                        alt=""
                        onClick={()=> props?.onHide()}
                    />
                </div>
                <div className="m-content">
                    {props?.children}
                </div>
            </div>
        </div>
    )
}