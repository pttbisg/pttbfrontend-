import React, { useState } from "react";
import {
  Alert,
  Button,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg";
function General() {
  /*STATES */
  const [visible, setVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  // HANDLERS
  const dismissAlert = () => {
    setVisible(false);
  };

  /* ON SAVE HANDLER */
  const handleChange = () => {};

  const handleClear = () => {
    setCompany("");
    setEmail("");
    setName("");
    setUserName("");
  };
  return (
    <React.Fragment>
      <Media>
        {/*
          update profile picture
           <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={img}
              alt="User"
              height="64"
              width="64"
            />
          </Media>
          <Media className="mt-25" body>
            <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
              >
                Upload Photo
                <Input type="file" name="file" id="uploadImg" hidden />
              </Button.Ripple>
              <Button.Ripple color="flat-danger">Remove</Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
          </Media> */}
      </Media>
      <Form className="mt-2" onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label for="userName">Username</Label>
              <Input
                id="userName"
                value={userName}
                placeholder={!userName && "Daniel Isc"}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                value={name}
                placeholder={!name && "Daniel chua"}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                value={email}
                placeholder={!email && "Daniel@interstellargoods.com"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <Alert
              className="mb-2"
              color="warning"
              isOpen={visible}
              toggle={dismissAlert}
            >
              <p className="mb-0">
                Your email is not confirmed. Please check your inbox.
                <span className="text-primary"> Resend Confirmation</span>
              </p>
            </Alert>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="company">Company</Label>
              <Input
                id="company"
                value={company}
                placeholder={!company && "interstellargoods"}
                onChange={(e) => setCompany(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="d-flex justify-content-start flex-wrap" sm="12">
            <Button.Ripple
              className="mr-50"
              type="submit"
              color="primary"
              onClick={handleChange}
            >
              Save Changes
            </Button.Ripple>
            <Button.Ripple type="reset" color="danger" onClick={handleClear} outline>
              Cancel 
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}

export default General;
