import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import format_phone from "../utils/helpers";
import Map from "../components/Map";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";
import "../styles/button-style.css";

const Location = () => {
  const location = useLocation();

  const [showMap, setShowMap] = useState(false);
  const [openDetails, setOpenDetails] = useState(true);
  const [openInstructions, setOpenInstruction] = useState(false);

  return (
    <main>
      <Container className="my-2 py-1 shadow rounded-lg  border border-secondary">
        <Button
          onClick={() => setOpenDetails(!openDetails)}
          aria-controls="details-fade-text"
          aria-expanded={openDetails}
          size="lg"
          className="btn-block my-2 collapse-button"
        >
          Location Details
        </Button>
        <Collapse in={openDetails}>
          <div id="collapse-details-bar">
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    {location.state.locationInfo.businessName}
                  </Card.Header>
                  <Card.Body className=" bg-light">
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>Manager:</b> McNatt, Colin
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Address:</b> {location.state.locationInfo.address}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Contact #:</b>{" "}
                        {format_phone(
                          location.state.locationInfo.businessContact
                        )}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Frequency:</b> {location.state.locationInfo.shifts}
                      </ListGroup.Item>
                      <Button
                        onClick={() => setOpenInstruction(!openInstructions)}
                        aria-controls="instructions-fade-text"
                        aria-expanded={openInstructions}
                        size="lg"
                        className="btn-block my-2 collapse-button"
                      >
                        Instructions
                      </Button>
                      <Collapse
                        style={{
                          height: "300px",
                          overflow: "scroll!important",
                        }}
                        in={openInstructions}
                      >
                        <div id="collapse-instructions-bar">
                          <Card>
                            <Card.Body className=" bg-light">
                              <ListGroup variant="flush">
                                <ListGroup.Item>
                                  <b>Facility Type:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.facilityType
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Cleaning Type:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.cleaningType
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Bathrooms:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.bathrooms
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Lobby:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.lobby
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Sitting-Area:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.sittingArea
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Break-Room:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.breakRoom
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Fornt-Desk:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.frontdesk
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Appliances:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.appliances
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Dusting:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.dusting
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Windows:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.exclusions
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Trash:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.trash
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Vacuum:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.vacuum
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Mop:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.mop
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Additional Services:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.additionalServices
                                  }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <b>Exclusions:</b>{" "}
                                  {
                                    location.state.locationInfo.instructions
                                      ?.exclusions
                                  }
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </div>
                      </Collapse>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Collapse>
        <Button
          onClick={() => {
            setShowMap(!showMap);
          }}
          aria-controls="details-fade-text"
          aria-expanded={showMap}
          size="lg"
          className="btn-block my-2 collapse-button"
        >
          Get Directions
        </Button>
        {showMap && (
          <Collapse in={showMap}>
            <div id="collapse-map">
              <ResponsiveEmbed
                className="mt-1 rounded"
                style={{ height: "1000px" }}
              >
                <div>
                  <Map destinationDb={location.state.locationInfo.address} />
                </div>
              </ResponsiveEmbed>
            </div>
          </Collapse>
        )}
      </Container>
    </main>
  );
};

export default Location;
