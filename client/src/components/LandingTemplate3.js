import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Container } from "react-bootstrap";

const LandingTemplate2 = () => {
  return (
    <>
      <Container className="" style={{ marginTop: "10vh" }}>
        <Carousel className="">
          <Carousel.Item>
            <img
              className="d-block w-100"
              // src="holder.js/800x400?text=First slide&bg=373940"
              src="https://via.placeholder.com/800x400?text=Image+Here"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First image - Template #3</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              // src="holder.js/800x400?text=Second slide&bg=282c34"
              src="https://via.placeholder.com/800x400?text=Image+Here"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second image - Template #3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              // src="holder.js/800x400?text=Third slide&bg=20232a"
              src="https://via.placeholder.com/800x400?text=Image+Here"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third image - Template #3</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Container>

        <Container className="mt-2">
          <Card className="">
            {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
            <Card.Body>
              <Card.Title>Template #3</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
      </Container>
    </>
  );
};

export default LandingTemplate2;
