import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FieldWithLabel from "../../ui-elements/field/FieldWithLabel";
import FieldWithDatePicker from "../../ui-elements/field/FieldWithDatePicker";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
});

const OrderForm = ({ toggle }) => {
  const handleSubmit = () => {};

  const [initialValues] = useState({
    name: "",
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        // actions.setSubmitting(true);
        // setIsSuccess(false);
        // setErrorMessage("");
        // const { name, company } = values;
        // let updateProfilesURL = apiConfig.endpoint.client.updateProfiles;
        // axios
        //   .patch(
        //     updateProfilesURL,
        //     {
        //       name,
        //       company,
        //     },
        //     {
        //       headers: {
        //         accesstoken: JSON.parse(localStorage.getItem("user"))
        //           .accessToken, //the token is a variable which holds the token
        //       },
        //     }
        //   )
        //   .then((response) => {
        //     actions.setSubmitting(false);
        //     // If return true means no expired token error
        //     if (APIErrorHandler(response.data)) {
        //       const { client_company, name } = response.data;
        //       let newInitialValues = {};
        //       newInitialValues.company = client_company;
        //       newInitialValues.name = name;
        //       setInitialValues({
        //         ...initialValues,
        //         ...newInitialValues,
        //       });
        //       setIsSuccess(true);
        //     }
        //   })
        //   .catch((errorMessage) => {
        //     actions.setSubmitting(false);
        //     if (errorMessage.response) {
        //       setErrorMessage(errorMessage.response.data?.message);
        //       // Request made and server responded
        //     } else if (errorMessage.request) {
        //       // The request was made but no response was received
        //       console.log(errorMessage.request);
        //     } else {
        //       // Something happened in setting up the request that triggered an errorMessage
        //       console.log("errorMessage", errorMessage.message);
        //     }
        //   });
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        resetForm,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => {
        return (
          <>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <FieldWithLabel
                  id="quantity"
                  label="Quantiy"
                  onChange={handleChange}
                  value={values.quantity}
                  placeholder="Enter quanity"
                  error={errors.quantity}
                  touched={touched.quantity}
                />
                <FieldWithLabel
                  id="name"
                  label="Name"
                  onChange={handleChange}
                  value={values.name}
                  placeholder="Enter name"
                  error={errors.name}
                  touched={touched.name}
                />
                <FieldWithLabel
                  id="company"
                  label="Company"
                  onChange={handleChange}
                  value={values.company}
                  placeholder="Enter company"
                  error={errors.company}
                  touched={touched.company}
                />
                <FieldWithLabel
                  id="address"
                  label="Address"
                  onChange={handleChange}
                  value={values.address}
                  placeholder="Enter address"
                  error={errors.address}
                  touched={touched.address}
                />
                <FieldWithLabel
                  id="postalCode"
                  label="Postal code"
                  onChange={handleChange}
                  value={values.postalCode}
                  placeholder="Enter postal code"
                  error={errors.postalCode}
                  touched={touched.postalCode}
                />
                <FieldWithLabel
                  id="zipcode"
                  label="Zipcode"
                  onChange={handleChange}
                  value={values.zipcode}
                  placeholder="Enter zipcode"
                  error={errors.zipcode}
                  touched={touched.zipcode}
                />
                <FieldWithLabel
                  id="deliveryNotes"
                  label="Delivery notes"
                  onChange={handleChange}
                  value={values.deliveryNotes}
                  placeholder="Enter delivery note"
                  error={errors.deliveryNotes}
                  touched={touched.deliveryNotes}
                  as="textarea"
                />
                <FieldWithDatePicker
                  id="deliveryDate"
                  label="Delivery date"
                  onChange={setFieldValue}
                  value={values.deliveryDate}
                  placeholder="Enter delivery date"
                  error={errors.deliveryDate}
                  touched={touched.deliveryDate}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Place order
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        );
      }}
    </Formik>
  );
};

const ReservationOrder = ({ masterSKU, quantity }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button.Ripple color="primary" outline onClick={toggle}>
        Place order
      </Button.Ripple>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reservation order</ModalHeader>
        <OrderForm toggle={toggle} />
      </Modal>
    </>
  );
};

export default ReservationOrder;
