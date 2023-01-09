import { Row, Col, Container, Card, Button, Form, Collapse } from "react-bootstrap";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_CLIENTS } from "../../utils/queries";


function ClientList() {
 
  
  // const [client, setclient] = useState([])
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
    // eslint-disable-next-line
    const { loading: clientLoad, data: clients, error: clientError, refetch: clientRefetch } = useQuery(QUERY_ALL_CLIENTS);


    const getElement = (event) => {
      let currentAvailTarget = event.currentTarget.getAttribute("data-target");
      console.log(currentAvailTarget)
      let currentAvailTable = document.getElementById(currentAvailTarget);
      if (currentAvailTable.classList.contains("show")) {
        currentAvailTable.classList.remove("show");
        setOpenDetails(false);
      } else {
        currentAvailTable.classList.add("show");
        setOpenDetails(true);
      }
    };
//   function sortName () {
//   clients.sort((a, b) => {
//     const nameA = a.company.toUpperCase(); // ignore upper and lowercase
//     const nameB = b.company.toUpperCase();
//     if (nameA < nameB) {
//       return -1;
//     }
//     if (nameA > nameB) {
//       return 1;
//     }
//     // names must be equal
//     return 0;
      
//   });
//   setclient(clients)
//  }
 
//   function sortDate() {
//     clients.sort( (a,b) => a.jobDate.localeCompare(b.jobDate) )
//     clients.reverse()
//     setclient(clients)
//   }
  return (
  <>
    <div
    className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
    style={{ margin: "20px 0px 20px 0px", textAlign: "center" }}
  >
            <Form>
            <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{marginTop:'10px'}}
        
      >
        Add New Client 
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Company Name
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="text"
                  placeholder="Enter Company Name"
                  name="name"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Contact Name
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="text"
                  placeholder="Enter Contact Person"
                  name="name"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Phone Number
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="tel"
                  placeholder="Client Phone"
                  name="telNo"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
            >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Email
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="email"
                  placeholder="Client Email"
                  name="email"
                  
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Address
                  </Form.Label>
                  <Form.Label></Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  placeholder="Enter Address"
                  name="address"
                />
              </Form.Group>

               <Row className="addy"
               
              > 
                <Col xs={7}>
                  <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
                  <Form.Control className="custom-border" placeholder="City" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    State
                  </Form.Label>
                  <Form.Control className="custom-border" placeholder="State" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Zipcode
                  </Form.Label>
                  <Form.Control className="custom-border" placeholder="Zip" />
                </Col>
              </Row>
              <Button
                className="button-custom submit-button-style"
                variant="primary"
                type="submit"
                
              >
                Add Client
              </Button>
        </div>
      </Collapse>
        </Form>
        </div>

      <Container style={{ border: "1px solid black" }}>
        <h3>Client List</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {clients?.clients?.map((client, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black" }}
                >
                  <h5 className="mb-0 text-left">
                    <Button
                      
                      style={{backgroundColor:'transparent', border:'none'}}
                      onClick={(event) => getElement(event)}
                      aria-controls={`collapse-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-text-${index}`}
                    >
                      {client?.businessName}
                    </Button>
                  </h5>
                  <button
                  style={{borderRadius:'5px'}}
                  >Edit</button>
                </div>

                <Collapse>
                  <div id={`#collapse-text-${index}`}>
                    <div>Contact Name: {client?.contact}</div>
                    <div>Phone: {client?.phone}</div>
                    <div>Email: {client?.email}</div>
                    <div>Address: {client?.streetAddress}</div>
                    <div>Suite: {client?.suite}</div>
                    <div>City: {client?.city}</div>
                    <div>State: {client?.state}</div>
                    <div>Zip: {client?.zip}</div>
                    {client?.schedule.map((job, index) => (
                      <>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                      </>
                    ))}
                  </div>
                </Collapse>
                
              </div>
            </div>
          ))}
        </Row>
      </Container>
    {/* <div
      className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
      style={{ margin: "20px 0px 20px 0px", textAlign: "center" }}
    >
      <Row style={{ marginTop:'15px', marginBottom:'10px' }}>
        <h2>Sort by:</h2>
        <Button 
        variant="primary" 
        style={{ marginRight: "25px", marginLeft:'25px'}}
        onClick={sortName}
        >
          Company Name
        </Button>
        <Button 
        variant="primary"
        
        onClick={sortDate}
        >Date Completed</Button>
        
      </Row> */}
{/* 
      <Container >
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {client.map((emp) => (
            <Card style={{ width: "18rem", margin: "5px" }}key={emp.id}>
              <Card.Body>
                <Card.Title className="mb-2 text-muted" >
                  {emp.company}
                </Card.Title>
                <Card.Subtitle style={{ marginTop: "3px" }} >
                  Contact: {emp.contact}{" "}
                </Card.Subtitle>
                <Card.Subtitle style={{ marginTop: "3px" }} >
                  Phone: {emp.phone}
                </Card.Subtitle>
                <Card.Subtitle style={{ marginTop: "3px" }} >
                 <a href={`mailto:${emp.email}`}>{emp.email}</a> 
                </Card.Subtitle>
                <Card.Subtitle style={{ marginTop: "3px" }} >
                  {emp.location}{" "}
                </Card.Subtitle>
                <Card.Subtitle style={{ marginTop: "3px" }} >
                  {emp.city}, {emp.state} {emp.zip}{" "}
                </Card.Subtitle>
                <Card.Subtitle style={{ marginTop: "3px" }} >
                  Service Date: {emp.jobDate}{" "}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container> */}
    {/* </div> */}
  </>
  );
}
export default ClientList;
