import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import qrcode_pristine_clean from "../../assets/qrcode_pristine_clean.png";
import "../../styles/button-style.css";

const Message = () => {
  const handleShiftEmail = (e) => {
    e.preventDefault();
    launchEmailPlatform();
  };

  // Open preferred email provide and preppulate
  const launchEmailPlatform = () => {
    window.open(
      `mailto:callasteven@gmail.com?&subject=Shift Coverage&body=Hello - I'd like to take the shift as X company on Y day of the week if available. I look forward to hearing from you.`
    );
    return false;
  };

  return (
    <div className="d-flex flex-column align-items-center mt-3 mb-3">
      <Card
        style={{ width: "18rem"}}
        className="d-flex align-items-center mb-1"
      >
        <Card.Body className="p-2">
          <Card.Title
            className="d-flex justify-content-center m-0"
            style={{
              fontStyle: "bold",
              fontSize: "26px",
              fontFamily: "cursive, Georgia, Times New Roman, serif",
            }}
          >
            Fast & Fair
          </Card.Title>
          <Card.Link
            href="https://www.pristinecleanbycolin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p
              className="d-flex justify-content-center mb-0"
              style={{
                fontStyle: "bold",
                fontFamily: "Georgia, Times New Roman, serif",
                fontSize: "20px",
              }}
            >
              {/* Pristine Clean */}
            </p>
          </Card.Link>
        </Card.Body>
      </Card>

      <Card
        className="d-flex flex-column align-items-center mb-1"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title
            className="text-center"
            style={{ textDecoration: "underline" }}
          >
            Shifts - Available
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            <li>Company #1, 6:30a, MWF</li>
            <li>Company #1, 6:30a, MWF</li>
            <li>Company #1, 6:30a, MWF</li>
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Button
              className="btn btn-sm btn-primary p-1 submit-button-style"
              onClick={(e) => handleShiftEmail(e)}
            >
              Email For Shift
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card
        style={{ width: "18rem" }}
        className="d-flex align-items-center mb-1"
      >
        <Card.Img
          variant="top"
          style={{ width: "150px", height: "150px" }}
          // src={qrcode_pristine_clean}
          src="https://via.placeholder.com/150?text=QRCode"
        />
        <Card.Body className="p-0">
          <Card.Title
            className="d-flex justify-content-center"
            style={{
              fontStyle: "bold",
              fontSize: "26px",
              fontFamily: "cursive, Georgia, Times New Roman, serif",
            }}
          >
            Get the app!
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Message;
