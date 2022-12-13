import React, { useState } from "react";
import {
  ListGroup,
  Card,
  Button,
  Collapse,
  Table,
  Row,
  Col,
} from "react-bootstrap/";
import { PersonX } from "react-bootstrap-icons";
import { XSquareFill, Check2Circle } from "react-bootstrap-icons";
import { useQuery, useMutation } from "@apollo/client";
import "../styles/button-style.css";
import format_phone from "../utils/helpers";
import { QUERY_USERS } from "../utils/queries";
import { DELETE_USER } from "../utils/mutations";
import { getManagerStatus } from "../utils/getManager";

const AllEmployeesCont = () => {
  const [openAvailability, setOpenAvailability] = useState(false);
  const manager = getManagerStatus();

  // get User query
  // eslint-disable-next-line
  const { loading, data, error, refetch } = useQuery(QUERY_USERS);

  // delete User query
  const [deleteUser] = useMutation(DELETE_USER);

  // delete USER
  const handleDeleteUser = async (userId) => {
    try {
      // eslint-disable-next-line
      const { data } = await deleteUser({
        variables: {
          id: userId,
        },
      });

      // window.location.reload();
      refetch();

    } catch (err) {
      console.log(err);
    }
  };

  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    let currentAvailTable = document.getElementById(currentAvailTarget);
    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenAvailability(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenAvailability(true);
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
      <>
        {data.users?.map((employee, index) => (
          <Card key={index} className="m-2 shadow border border-secondary">
            <Card.Header className="container">
              <Row className="justify-content-between">
                <Col xs={10}>
                  <p>
                    {employee.firstName ? employee.firstName : "No First Name"}{" "}
                    {employee.lastName ? employee.lastName : "No Last Name"}{" "}
                    (Username: {employee.username})
                  </p>
                </Col>
                <Col xs={1.5} className="py-0">
                  {manager && (
                    <PersonX
                      id="delete-employee"
                      color="red"
                      size="24px"
                      className="mr-2 button-style"
                      data-user={employee._id}
                      //section

                      onClick={(event) => {
                        let userId =
                          event.currentTarget.getAttribute("data-user");
                        handleDeleteUser(userId);
                      }}

                      //section
                    />
                  )}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className=" bg-light">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Phone #:</b>{" "}
                  {employee.cell && format_phone(employee.cell)
                    ? format_phone(employee.cell)
                    : "No Phone Yet"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Email:</b>{" "}
                  {employee.email ? employee.email : "No Email Yet"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={(event) => getElement(event)}
                    aria-controls="example-fade-text"
                    aria-expanded={openAvailability}
                    size="lg"
                    className="btn-block my-2 collapse-button"
                    data-target={`#collapseTarget-${index}`}
                  >
                    View Availability
                  </Button>

                  <Collapse>
                    <div id={`#collapseTarget-${index}`}>
                      <Table striped bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Day</th>
                            <th style={{ textAlign: "center" }}>AM</th>
                            <th style={{ textAlign: "center" }}>PM</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Sunday</td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.sundayAm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.sundayPm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Monday</td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.mondayAm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.mondayPm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Tuesday</td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.tuesdayAm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.tuesdayPm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Wednesday</td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.wednesdayAm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.wednesdayPm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Thursday</td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.thursdayAm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.thursdayPm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Friday</td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.fridayAm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.fridayPm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>Saturday</td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.saturdayAm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {employee.availability.saturdayPm ? (
                                <Check2Circle color="green" />
                              ) : (
                                <XSquareFill color="red" />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Collapse>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
};

export default AllEmployeesCont;
