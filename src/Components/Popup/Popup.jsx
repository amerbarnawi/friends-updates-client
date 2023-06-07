import React from "react";
import "../Popup/Popup.css";
import { MdClose } from "react-icons/md";

function Popup(props) {
  return props.isTrigger ? (
    <div className="popup-external">
      <div className="popup-internal">
        <MdClose
          className="close-icon"
          onClick={() => props.setIsPopupTrigger(false)}
        />
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
