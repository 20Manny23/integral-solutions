import Footer from "../components/Footer"
import Card from 'react-bootstrap/Card';
import steelcase from '../assets/images/steelcase.jpg'
import { Row, Col, Container, Nav,} from "react-bootstrap";
import officescapes from '../assets/images/officescapes.jpeg'
import officestogo from '../assets/images/officestogo.jpg'
import hermanmiller from '../assets/images/hermanmiller.jpg'
import '../styles/LinksPage.css'



function LinksPage () {

    return(

<div className="bk-img">      
    <div className="head">
        <h1>Needing Great Office Furniture with Competitive Pricing? </h1>
        <h2 style={{fontStyle:'italic'}}>We've had great Success Working with these Companies!</h2>
        </div>
        <Row>
            <Col>
        <Card className='company'>
            <Card.Link href="https://www.steelcase.com/" target={"_blank"}>
      <Card.Img variant="top" src= {steelcase} />
      </Card.Link>
   
    </Card>
    </Col>
    <Col>
    <Card className='company' >
    <Card.Link href="https://www.officescapes.com/"target={"_blank"}>
      <Card.Img variant="top" src= {officescapes} />
      </Card.Link>

    </Card>
    </Col>
  
        <Col>
    <Card className='company'>
    <Card.Link href="https://www.hermanmiller.com/"target={"_blank"}>
      <Card.Img variant="top" src= {hermanmiller} />
      </Card.Link>
   
    </Card>
    </Col>
    </Row>

<Row>
    <Col>
    <Card className='company'>
    <Card.Link href="https://www.officestogo.com/"target={"_blank"}>
      <Card.Img variant="top" src= {officestogo} />
      </Card.Link>
   
    </Card>
    </Col>
    </Row>
    <Footer/>
</div>
    )
}
export default LinksPage