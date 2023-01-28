import { Alert } from 'react-bootstrap';

import littleFella from "../assets/images/logo-no-slogan.png";

const SuccessAlert = (props) => {
    return (
        <Alert
            className="mb-3 form-length"
            variant={props.variant}
            show={props.show}
        >             
        <img className="little-fella" src={littleFella} alt="little fella" style={{
                maxHeight: "40px",
                marginBottom: "10px",
                maxWidth: "40px",
                backgroundColor: "black",
                borderRadius: "50%",
            }}></img>
            <p className="alert-message">{props.message}</p>
        </Alert>
    );
}
export default SuccessAlert;