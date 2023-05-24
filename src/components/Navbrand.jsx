import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navbrand() {
  return (
    <>
      <Navbar bg="danger">
        <Container>
          <Navbar.Brand href="#home"><b className='text-white'>Portal Berita</b></Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Navbrand;