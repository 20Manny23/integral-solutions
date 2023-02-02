import { Alert } from 'react-bootstrap';

import littleFella from "../assets/images-avif/logo-no-slogan.avif";

const SuccessAlert = (props) => {
    return (
        <Alert
            className="mb-3 form-length"
            variant="success"
            show={props.show}
        >
            <img className="little-fella" src={littleFella} alt="Integral Solution logo" style={{
                maxHeight: "40px",
                marginBottom: "10px",
                maxWidth: "40px",
                backgroundColor: "black",
                borderRadius: "50%",
            }}></img>
            <p className="alert-message">{props.message}</p>
        </Alert>
    );
};

export default SuccessAlert;