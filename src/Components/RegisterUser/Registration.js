import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Nav,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCities, getCountries, getStates, userRegistration } from "../../api/api";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function Registration() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [countryData , setCountryData]= useState([])
  const [selectedCountry, setSelectedCountry]=useState();
  const [stateData, setStateData]= useState([])
  const [selectedState, setSelectedState]= useState();
  const [cityData, setCityData]= useState([]);

  let nameRef = useRef(null);
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  let roleRef = useRef(null);
  let genderRef = useRef(null);
  let countryRef = useRef(null);
  let stateRef = useRef(null);
  let cityRef = useRef(null);
  let pincodeRef = useRef(null);

  let selectedGender = (event) => {
    console.log(event);
    if (event.target.checked === true) {
      genderRef.current = event.target.value;
    } else {
      return null;
    }

    // console.log(genderRef.current);
    // console.log(event)
    // console.log(event.target.checked)
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      let dataToSend = new FormData();

      dataToSend.append("name", nameRef.current.value);
      dataToSend.append("email", emailRef.current.value);
      dataToSend.append("password", passwordRef.current.value);
      dataToSend.append("role", roleRef.current.value);
      dataToSend.append("gender", genderRef.current);
      dataToSend.append("country",parseInt(countryRef.current.value) );
      dataToSend.append("state", stateRef.current.value);
      dataToSend.append("city", cityRef.current.value);
      dataToSend.append("pincode", pincodeRef.current.value);


      // console.log(...dataToSend)

      // for (const entry of dataToSend.entries()) {
      //   console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaa",entry[0], entry[1]);
      // }

      try {
        let result = await userRegistration(dataToSend);
        if(result.status==='success'){
          alert("Registration successfully completed")
        }
        if(result.details.code === 'ER_DUP_ENTRY'){
          alert('email id already exists')
        }

      } catch (error) {
        // console.log(error);
      }
    }
  };

const fetchCountriesData = async ()=>{
  try {
    let data= await getCountries();
    let result=await data.details
    setCountryData(result);   
  } catch (error) {
    console.log(error)
  }
}

let fetchStates= async()=>{
  try {
    let response=await getStates(selectedCountry)
    let result=response.details;
    setStateData(result);
  
  } catch (error) {
    console.log(error)
  }
}

let fetchCities= async ()=>{
  try {
    let data= await getCities(selectedState);
    let result=data.details;
    setCityData(result)
  } catch (error) {
    console.log(error)
  }
}
  useEffect(()=>{
  fetchCountriesData();  
  },[])
  useEffect(()=>{
    if(selectedCountry != null){
      fetchStates();
    }
  },[selectedCountry])
useEffect(()=>{
  if(selectedState != null){
    fetchCities();
  }
},[selectedState])
  return (
    <div className="bg-container">
      <Container fluid="md">
        <Row>
          <Col
            md="12"
            style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Registration
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Form noValidate validated={validated} onSubmit={submitSignup}>
          <Card className="reg-card" style={{ }}>
            <Row>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }} htmlFor="name">
                  Name:{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                  ref={nameRef}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter name.
                </Form.Control.Feedback>
              </Col>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }} htmlFor="email">
                  Email:{" "}
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="email"
                  ref={emailRef}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter email.
                </Form.Control.Feedback>
              </Col>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }} htmlFor="password">
                  {" "}
                  Password:{" "}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                  ref={passwordRef}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter password.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }}>Role: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  ref={roleRef}
                  required
                >
                  <option value="" aria-disabled>
                    Select role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </Form.Select>
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please select role.
                </Form.Control.Feedback>
              </Col>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }}>Gender: </Form.Label>
                <br />
                <Form.Check
                  inline
                  label="Male"
                  name="group1"
                  required
                  type="radio"
                  id="Male"
                  value="Male"
                  ref={genderRef}
                  onChange={selectedGender}
                  
                 
                />
                <Form.Check
                  inline
                  label="Female"
                  name="group1"
                  required
                  type="radio"
                  id="Female"
                  value="Female"
                  ref={genderRef}
                  onChange={selectedGender}
                  
                  
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  select gender.
                </Form.Control.Feedback>
                {/* <Form.Check
            inline
            label="Not Specified"
            name="group1"
            type='radio'
            value='Not Specified'
            id="Not Specified"
            ref={genderRef}
            onChange={selectedGender}
            
          /> */}
         
              </Col>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Country:{" "}
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  ref={countryRef}
                  value={selectedCountry}
                  onChange={(e) => {setSelectedCountry(e.target.value)
                  }}
                  required
                >
                  <option value="" aria-disabled>
                    Select country
                  </option>
                  
                 {Array.isArray(countryData) ? ( countryData?.map((country)=>
                  <option key={country.countryid} value={country.countryid}>{country.countryname}</option>
                 ))
                 : (
                  <option value="">No data available</option>
                )}
                </Form.Select>
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please select country.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }}>State: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  ref={stateRef}
                  value={selectedState}
                  onChange={(e)=>{setSelectedState(e.target.value)}}
                  required
                >
                  <option value="" aria-disabled>
                    Select state
                  </option>
                  {stateData?.map((state)=>(
                    <option key={state.stateid} value={state.stateid}>{state.statename}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please select state.
                </Form.Control.Feedback>
              </Col>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }}>City: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  ref={cityRef}
                  required
                >
                  <option value="" aria-disabled>
                    Select city
                  </option>
                 {cityData?.map((city)=>(
                  <option key={city.cityid} value={city.cityid}>{city.cityname}</option>
                 ))}
                </Form.Select>
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please select city.
                </Form.Control.Feedback>
              </Col>
              <Col md="4">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Pin Code:{" "}
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Pin code"
                  ref={pincodeRef}
                  required
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter pincode.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="4"></Col>
              <Col md="4"></Col>
              <Col md="4" style={{ display: "flex", justifyContent: "end" }}>
                <Button className="primary" type="submit">
                  Signup
                </Button>
              </Col>
            </Row>
            <Link onClick={handleShow}>
              Already have an account? Login here.
            </Link>
          </Card>
        </Form>
      </Container>

      <div>
        {/* LOGIN USER CODE */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Login</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Registration;
