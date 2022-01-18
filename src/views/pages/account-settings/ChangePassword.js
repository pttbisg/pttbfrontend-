import React, { useState } from "react";
import { Button, FormGroup, Row, Col, Alert } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { apiConfig } from "../../../redux/appConfig/app";

const formSchema = Yup.object().shape({
  // oldPassword: Yup.string().required("Required"),
  // newPassword: Yup.string().required("Required"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
  //   .required("Required"),
});

function ChangePasswordForm({ setErrorMessage, setIsSuccess }) {
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        setIsSuccess(false);
        setErrorMessage("");

        const { newPassword, oldPassword, confirmPassword } = values;

        let updatePasswordURL = apiConfig.endpoint.auth.updatePassword;

        axios
          .patch(
            updatePasswordURL,
            {
              oldPassword,
              newPassword,
              confirmPassword,
            },
            {
              headers: {
                accessToken: JSON.parse(localStorage.getItem("user"))
                  .accessToken, //the token is a variable which holds the token
              },
            }
          )
          .then((response) => {
            actions.setSubmitting(false);

            const { message } = response.data;

            // Validation error or token error
            if (message) {
              setErrorMessage(message);
            } else {
              actions.resetForm();
              setIsSuccess(true);
            }
          })
          .catch((errorMessage) => {
            if (errorMessage.response) {
              console.log(errorMessage.response, "errorMessage.response");
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
            <FormGroup>
              <Field
                name="oldPassword"
                id="oldPassword"
                onChange={handleChange}
                className={`form-control ${
                  errors.oldPassword && touched.oldPassword && "is-invalid"
                }`}
                placeholder="Old Password"
                value={values.oldPassword}
              />
              {errors.oldPassword && touched.oldPassword ? (
                <div className="text-danger">{errors.oldPassword}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Field
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                value={values.newPassword}
                onChange={handleChange}
                className={`form-control ${
                  errors.newPassword && touched.newPassword && "is-invalid"
                }`}
              />
              {errors.newPassword && touched.newPassword ? (
                <div className="text-danger">{errors.newPassword}</div>
              ) : null}
            </FormGroup>
            <FormGroup>
              <Field
                name="confirmPassword"
                id="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  "is-invalid"
                }`}
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="text-danger">{errors.confirmPassword}</div>
              ) : null}
            </FormGroup>

            <div className="d-flex justify-content-start flex-wrap">
              <Button.Ripple
                className="mr-1 mb-1"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Save Changes
              </Button.Ripple>
              <Button.Ripple
                className="mb-1"
                color="danger"
                type="reset"
                outline
                onClick={resetForm}
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

function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Row className="pt-1">
      <Col sm="12">
        <Alert color="success" isOpen={isSuccess}>
          Your new password have been updated
        </Alert>
        <Alert color="danger" isOpen={Boolean(errorMessage)}>
          {errorMessage}
        </Alert>
        <ChangePasswordForm
          setErrorMessage={setErrorMessage}
          setIsSuccess={setIsSuccess}
        />
      </Col>
    </Row>
  );
}

export default ChangePassword;
