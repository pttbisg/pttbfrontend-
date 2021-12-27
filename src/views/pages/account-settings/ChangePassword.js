import React, { useState } from "react";
import { Button, FormGroup, Row, Col, Alert } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
const formSchema = Yup.object().shape({
  oldPass: Yup.string().required("Required"),
  newPass: Yup.string().required("Required"),
  newPassConfirm: Yup.string()
    .oneOf([Yup.ref("newPass"), null], "Passwords must match")
    .required("Required"),
});

function ChangePassword() {
  const [visible, setVisible] = useState(true);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  /*Handlers */
  const dismissAlert = () => {
    setVisible(false);
  };
  const updatePassWord = () => {
    if (newPass && oldPass && newPassConfirm) {
      /*Make sure the password match the confirm password */
      /*TODO: Compare the password to the one from the DB */
      /* compare the newPassword to the oldPassword */
      /*if everything checks update the password */
    }
  };

  const handleClear = () => {
    setNewPass("");
    setOldPass("");
    setNewPassConfirm("");
  };
  return (
    <React.Fragment>
      <Row className="pt-1">
        <Col sm="12">
          <Formik
            initialValues={{
              oldPass: "",
              newPass: "",
              newPassConfirm: "",
            }}
            validationSchema={formSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup>
                  <Field
                    name="oldPass"
                    id="oldPass"
                    onChange={(e) => setOldPass(e.target.value)}
                    className={`form-control ${
                      errors.oldPass && touched.oldPass && "is-invalid"
                    }`}
                    placeholder={!oldPass && "Old Password"}
                    value={oldPass}
                  />
                  {errors.oldPass && touched.oldPass ? (
                    <div className="text-danger">{errors.oldPass}</div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Field
                    name="newPass"
                    placeholder={!newPass && "New Password"}
                    value={newPass}
                    id="newPass"
                    onChange={(e) => setNewPass(e.target.value)}
                    className={`form-control ${
                      errors.newPass && touched.newPass && "is-invalid"
                    }`}
                  />
                  {errors.newPass && touched.newPass ? (
                    <div className="text-danger">{errors.newPassConfirm}</div>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Field
                    name="newPassConfirm"
                    id="newPassConfirm"
                    className={`form-control ${
                      errors.newPassConfirm &&
                      touched.newPassConfirm &&
                      "is-invalid"
                    }`}
                    placeholder={!newPassConfirm && "Confirm Password"}
                    value={newPassConfirm}
                    onChange={(e) => setNewPassConfirm(e.target.value)}
                  />
                  {errors.newPassConfirm && touched.newPassConfirm ? (
                    <div className="text-danger">{errors.newPassConfirm}</div>
                  ) : null}
                </FormGroup>

                <div className="d-flex justify-content-start flex-wrap">
                  <Button.Ripple
                    className="mr-1 mb-1"
                    color="primary"
                    type="submit"
                    onClick={updatePassWord}
                  >
                    Save Changes
                  </Button.Ripple>
                  <Button.Ripple
                    className="mb-1"
                    color="danger"
                    type="reset"
                    outline
                    onClick={handleClear}
                  >
                    Cancel
                  </Button.Ripple>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ChangePassword;
