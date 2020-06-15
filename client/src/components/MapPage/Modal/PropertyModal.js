import React, { useContext } from "react";
import Modal from "react-modal";
import {CityContext} from "../../Context/CityContext";
import {UserContext} from "../../Context/UserContext";
import { Button } from "@material-ui/core";
import { sendMail } from "../../../lib/Helpers/AuthHelpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Modal.css";

const PropertyModal = (props) => {
    const { activeProp } = useContext(CityContext);
    const { isAuth } = useContext(UserContext);

    return (
        <>
        <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        <Modal
            isOpen={props.modalOpen}
            contentLabel="Selected property"
            appElement={document.querySelector("#main")}
            closeTimeoutMS={200}
            className="modal"
        >
        {activeProp && <h3 className="modal__title">{activeProp.UnparsedAddress}</h3>}
        <br />
        {activeProp && <h4 className="modal__subTitle">{`$${props.addCommas(activeProp.ListPrice)}`}</h4>}
        {activeProp && <p className="modal__body">{activeProp.PublicRemarks}</p>}
        <br />
        <div id="btnDiv">
            <Button className="modal__button" onClick={
                async ()=>{
                    const dataToSubmit = {
                        name:isAuth.user.name,  
                        email:isAuth.user.email,
                        property:activeProp.UnparsedAddress 
                    };
                    let success = await sendMail(dataToSubmit);
                    toast.success("Email sent, broker will contact you shortly.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                }
            }
            >Contact Broker</Button>
            <Button className="modal__button" onClick={props.modalHandler}>Close</Button>
        </div>
        </Modal>
        </>
    )
    };

export default PropertyModal;
