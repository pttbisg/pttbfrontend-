import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Media,
  FormGroup,
  Label,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { apiConfig } from "../../../redux/appConfig/app";
// import img from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import { APIErrorHandler } from "../../../extensions/functions/error";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
});

function EmailConfirmAlert() {
  const [visible, setVisible] = useState(false);

  // HANDLERS
  const dismissAlert = () => {
    setVisible(false);
  };

  return (
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
  );
}

const FieldWithLabel = ({
  id,
  label,
  onChange,
  placeholder,
  value,
  error,
  touched,
  disabled,
}) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Field
        name={id}
        id={id}
        onChange={onChange}
        className="form-control"
        className={`form-control ${error && touched && "is-invalid"}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
      {error && touched ? <div className="text-danger">{error}</div> : null}
    </FormGroup>
  );
};

function GeneralForm({ profiles, setErrorMessage, setIsSuccess }) {
  const { email, new_email } = JSON.parse(localStorage.getItem("user"));

  const defaultInitialValues = {
    name: profiles.name,
    email: new_email || email,
    company: profiles.client_company,
  };

  const [initialValues, setInitialValues] = useState(defaultInitialValues);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        setIsSuccess(false);
        setErrorMessage("");

        const { name, company } = values;

        let updateProfilesURL = apiConfig.endpoint.client.updateProfiles;

        axios
          .patch(
            updateProfilesURL,
            {
              name,
              company,
            },
            {
              headers: {
                accesstoken: JSON.parse(localStorage.getItem("user"))
                  .accessToken, //the token is a variable which holds the token
              },
            }
          )
          .then((response) => {
            actions.setSubmitting(false);

            // If return true means no expired token error
            if (APIErrorHandler(response.data)) {
              const { client_company, name } = response.data;

              let newInitialValues = {};

              newInitialValues.company = client_company;
              newInitialValues.name = name;

              setInitialValues({
                ...initialValues,
                ...newInitialValues,
              });

              setIsSuccess(true);
            }
          })
          .catch((errorMessage) => {
            actions.setSubmitting(false);

            if (errorMessage.response) {
              setErrorMessage(errorMessage.response.data?.message);
              // Request made and server responded
            } else if (errorMessage.request) {
              // The request was made but no response was received
              console.log(errorMessage.request);
            } else {
              // Something happened in setting up the request that triggered an errorMessage
              console.log("errorMessage", errorMessage.message);
            }
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        resetForm,
        handleChange,
        handleSubmit,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
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
            <FieldWithLabel
              id="name"
              label="Name"
              onChange={handleChange}
              value={values.name}
              placeholder="Daniel Isc"
              error={errors.name}
              touched={touched.name}
            />
            <FieldWithLabel
              id="email"
              label="Email"
              onChange={handleChange}
              value={values.email}
              placeholder="Daniel@interstellargoods.com"
              error={errors.email}
              touched={touched.email}
              disabled
            />
            <EmailConfirmAlert />
            <FieldWithLabel
              id="company"
              label="Company"
              onChange={handleChange}
              value={values.company}
              placeholder="interstellargoods"
              error={errors.company}
              touched={touched.company}
            />
            <div className="d-flex justify-content-start flex-wrap">
              <Button.Ripple
                className="mr-1 mb-1"
                type="submit"
                color="primary"
                disabled={
                  isSubmitting ||
                  (!values.name && !values.email && !values.company)
                }
              >
                Save Changes
              </Button.Ripple>
              <Button.Ripple
                className="mb-1"
                type="reset"
                color="danger"
                onClick={resetForm}
                outline
              >
                Cancel
              </Button.Ripple>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

function General() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    let getProfilesURL = apiConfig.endpoint.client.getProfiles;

    axios
      .get(getProfilesURL, {
        headers: {
          accesstoken: JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((response) => {
        // If return true means no expired token error
        if (APIErrorHandler(response.data)) {
          setProfiles(response.data);
          setIsLoading(false);
        }
      })
      .catch((errorMessage) => {
        setIsLoading(false);

        if (errorMessage.response) {
          setErrorMessage(errorMessage.response?.data?.message);
          // Request made and server responded
        } else if (errorMessage.request) {
          // The request was made but no response was received
          console.log(errorMessage.request);
        } else {
          // Something happened in setting up the request that triggered an errorMessage
          console.log("errorMessage", errorMessage.message);
        }
      });
  }, []);

  return (
    <Row>
      <Col sm="12">
        <Alert color="success" isOpen={isSuccess}>
          Your profiles have been updated
        </Alert>
        <Alert color="danger" isOpen={Boolean(errorMessage)}>
          {errorMessage}
        </Alert>
        {isLoading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <GeneralForm
            setErrorMessage={setErrorMessage}
            setIsSuccess={setIsSuccess}
            isLoading={isLoading}
            profiles={profiles}
          />
        )}
      </Col>
    </Row>
  );
}

export default General;
