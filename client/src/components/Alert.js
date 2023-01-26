import Alert from 'react-bootstrap/Alert';

function GenericAlert() {
    return (
        <Alert variant="success"
        dismissible>
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
            lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
            fermentum.
        </p>
        <hr />
        <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
        </p>
        </Alert>
    );
}

export default GenericAlert;