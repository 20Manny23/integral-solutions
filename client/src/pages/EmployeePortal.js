// import React, { useEffect, useState } from "react";
import { Row, Container, Card } from "react-bootstrap";


function EmployeePortal() {
  const employee = [
    {
      id: 3,
      jobDate: "12/20/2022",
      company: "Hoff inc",
      location: "777 Richman Blackhawk Co",
      details: "This is full office move",
      startTime: "8am",
      hoursWorked: 7,
    },
    {
      id: 2,
      jobDate: "12/05/2022",
      company: "Rod inc",
      location: "77799 Lucky Ave BlackHawk Co",
      details: "Delivery, installation, cleanup",
      startTime: "9am",
      hoursWorked: 8,
    },
    {
      id: 1,
      jobDate: "12/14/2022",
      company: "Steve inc",
      location: "463 Yatzee Denver Co",
      details: "Just a delivery",
      startTime: "12pm",
      hoursWorked: 11,
    },
    {
      id: 4,
      jobDate: "12/01/2022",
      company: "Data inc",
      location: "189 Poplar Aravada Co",
      details: "Just a delivery",
      startTime: "2pm",
      hoursWorked: 11,
      },
  ];

    let upcomingJob = [];
    let pastJob = [];
    const current = new Date().toLocaleDateString('en-us', { year:"numeric", month:"numeric", day:"numeric"}) 
    
    //compares jobDate to current date and pushes to correct array 
   for (let i = 0; i < employee.length; i++) {
        if (current <= employee[i].jobDate) {
            upcomingJob.push(employee[i])
        }
        else{
            pastJob.push(employee[i])
        }
   }
   //sort jobs by date 
    upcomingJob.sort( (a,b) => a.jobDate.localeCompare(b.jobDate) )
    pastJob.sort( (a,b) => a.jobDate.localeCompare(b.jobDate) )

    //reverses past jobs so most recent completed show first 
    const renderPast = pastJob.reverse()


  return (
    <>
      <h3 style={{ textAlign: "center" }}>"Employee Name Here"</h3>
      
      <Container>
        <Row style={{display:'flex', justifyContent:'center'}}>
          {upcomingJob.map((emp) => (
            <Card style={{ width: "18rem", margin: "5px" }} key={emp.id}>
              <Card.Body>
                <Card.Title>{emp.jobDate} {emp.startTime}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Company: {emp.company}
                </Card.Subtitle>
                <Card.Subtitle>{emp.location}</Card.Subtitle>
                <Card.Text>{emp.details}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
      <h3 style={{ textAlign: "center", marginTop: '50px' }}>Completed Jobs</h3>
      <Container >
        <Row style={{display:'flex', justifyContent:'center'}}>
          {renderPast.map((emp) => (
            <Card style={{ width: "18rem", margin: "5px", backgroundColor:'rgb(196, 189, 189)' }}>
              <Card.Body>
                <Card.Title>{emp.jobDate}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Company: {emp.company}
                </Card.Subtitle>
                <Card.Subtitle>{emp.location}</Card.Subtitle>
                <Card.Text>{emp.details}</Card.Text>
                <Card.Subtitle>Hours Completed: {emp.hoursWorked}</Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default EmployeePortal;
