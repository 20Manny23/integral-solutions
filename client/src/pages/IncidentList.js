import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_INCIDENTS } from "../utils/queries";
import { DELETE_INCIDENT } from "../utils/mutations";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap/";
import { X } from "react-bootstrap-icons";
import "../styles/button-style.css";
import "../styles/heading-style.css";

const IncidentList = () => {
  // get incidents query
  // eslint-disable-next-line
  const { loading, data, error, refetch } = useQuery(QUERY_INCIDENTS);
  let incidents;
  if (!loading) {
    incidents = data.incidents;
  }

  // delete incident query
  const [deleteIncident] = useMutation(DELETE_INCIDENT);

  // delete incident
  const handleDeleteIncident = async (incidentId) => {
    try {
      // eslint-disable-next-line
      const { data } = await deleteIncident({
        variables: {
          id: incidentId,
        },
      });

      // window.location.reload();
      refetch();
      
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div
        style={{ minHeight: "80vh", width: "100vw" }}
        className="d-flex justify-content-center align-items-center align-content-center m-0"
      >
        <div className="lds-hourglass"></div>
      </div>
    );
  } else if (!loading) {
    return (
      <Container className="py-2" style={{ marginTop: "85px" }}>
        <h2 className="display-6 custom-text mt-3 mb-0 heading">Incidents</h2>
        <Row>
          <Col>
            {incidents.map((incident) => (
              <Card
                key={incident._id}
                className="my-3 shadow rounded-lg  border border-secondary"
              >
                <Card.Header className="container">
                  <Row className="justify-content-between card-header-background">
                    <Col xs={10}>{incident.locationName}</Col>
                    <Col xs={1.5}>
                      <div>
                        <X
                          id="delete-incident"
                          color="red"
                          size="28px"
                          className="mr-2 button-style"
                          data-incident={incident._id}
                          onClick={(event) => {
                            let incidentId =
                              event.currentTarget.getAttribute("data-incident");
                            handleDeleteIncident(incidentId);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className=" bg-light">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <b>Subject:</b> {incident.subject}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Employee:</b> {incident.employeeName}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Phone:</b> {incident.employeePhone}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Urgency:</b> {incident.urgent}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Details:</b> {incident.incidentDetails}{" "}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default IncidentList;
