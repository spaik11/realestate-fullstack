import React, { useContext } from "react";
import Modal from "react-modal";
import { CityContext } from "../../Context/CityContext";
import { Button } from "@material-ui/core";
import "./Modal.css";

const PropertyModal = (props) => {
  const { activeProp } = useContext(CityContext);

  return (
    <Modal
      isOpen={props.modalOpen}
      contentLabel="Selected property"
      appElement={document.querySelector("#main")}
      closeTimeoutMS={200}
      className="modal">
      {activeProp && (
        <h3 className="modal__title">{activeProp.UnparsedAddress}</h3>
      )}
      {activeProp && <p className="modal__body">{activeProp.PublicRemarks}</p>}
      <div id="btnDiv">
        <Button className="modal__button" onClick={props.modalHandler}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default PropertyModal;
