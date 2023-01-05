import { Row, Container, Card, Button } from "react-bootstrap";
import { useState } from "react";

function ClientList() {
  const clients = [
    {
      jobDate: "12/20/2022",
      company: "Hoff inc",
      contact: "Bryan Wienhoff",
      phone: "217-789-1528",
      email: "mo@mo.com",
      location: "777 Richman St",
      city: "Brighton",
      state: "Co",
      zip: "82614",
      details: "This is full office move",
      startTime: "8am",
    },
    {
      jobDate: "12/05/2022",
      company: "Rod inc",
      contact: "Henry Ford",
      phone: "217-789-1528",
      email: "mo@mo.com",
      location: "77799 Lucky Ave",
      city: "Blackhawk",
      state: "Co",
      zip: "77777",
      details: "Delivery, installation, cleanup",
      startTime: "9am",
    },
    {
      jobDate: "12/14/2022",
      company: "Steve inc",
      contact: "Rod Blago",
      phone: "217-789-1528",
      email: "looooongdamnemailaddress@mo.com",
      location: "463 Yatzee St",
      city: "Denver",
      state: "Co",
      zip: "80004",
      details: "Just a delivery",
      startTime: "12pm",
    },
    {
      jobDate: "12/01/2022",
      company: "Data inc",
      contact: "Cesar Milan",
      phone: "217-789-1528",
      email: "heeeellllllooooo@mo.com",
      location: "189 Poplar Ave",
      city: "Arvada",
      state: "Co",
      zip: "80004",
      details: "Just a delivery",
      startTime: "2pm",
    },
  ];
  const [client, setclient] = useState([])
 
  function sortName () {
  clients.sort((a, b) => {
    const nameA = a.company.toUpperCase(); // ignore upper and lowercase
    const nameB = b.company.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
      
  });
  setclient(clients)
 }
 
  function sortDate() {
    clients.sort( (a,b) => a.jobDate.localeCompare(b.jobDate) )
    clients.reverse()
    setclient(clients)
  }
  return (
    <div
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
        
      </Row>

      <Container >
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {client.map((emp) => (
            <Card style={{ width: "18rem", margin: "5px" }}>
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
                  {emp.email}
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
      </Container>
    </div>
  );
}
export default ClientList;
