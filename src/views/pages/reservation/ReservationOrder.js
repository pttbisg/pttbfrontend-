import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import FieldWithLabel from "../../ui-elements/field/FieldWithLabel";
import FieldWithDatePicker from "../../ui-elements/field/FieldWithDatePicker";
import { createReservation } from "../../../redux/actions/reservation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const formSchema = Yup.object().shape({
  quantity: Yup.number().required().positive().integer(),
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  postalCode: Yup.number().required().positive().integer(),
  zipcode: Yup.number().required().positive().integer(),
  deliveryDate: Yup.date().min(new Date()).required("Required"),
  linktableMastersku: Yup.string().required("Required"),
});

const OrderForm = ({ masterSKU, toggle, quantity, setState, data }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const [initialValues] = useState({
    quantity: "",
    name: "",
    company: "",
    address: "",
    postalCode: "",
    zipcode: "",
    deliveryNotes: "",
    deliveryDate: null,
    linktableMastersku: masterSKU,
  });

  const updateParentState = (newQuantity) => {
    const dataIndex = data.findIndex((item) => item.masterSKU === masterSKU);

    const tempData = [...data];

    tempData[dataIndex] = {
      ...tempData[dataIndex],
      quantity: newQuantity,
    };

    setState({ data: tempData });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        dispatch(
          createReservation(
            values,
            (res) => {
              const { availableQuantiy } = res;

              toggle();
              updateParentState(availableQuantiy);
            },
            (e) => {
              const { message, availableQuantiy } = e;

              setErrorMessage(message);
              if (availableQuantiy !== null)
                setCurrentQuantity(availableQuantiy);
              actions.setSubmitting(false);
            }
          )
        );
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => {
        return (
          <>
            <ModalBody>
              <Alert color="danger" isOpen={Boolean(errorMessage)}>
                {errorMessage}
              </Alert>
              <Form onSubmit={handleSubmit}>
                <p className="text-right">
                  Current quantity: {currentQuantity}
                </p>
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
                <ModalFooter>
                  <Button color="primary" type="submit" disabled={isSubmitting}>
                    Place order
                  </Button>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </ModalBody>
          </>
        );
      }}
    </Formik>
  );
};

const ReservationOrder = ({ masterSKU, quantity, setState, data }) => {
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
        <OrderForm
          toggle={toggle}
          masterSKU={masterSKU}
          quantity={quantity}
          setState={setState}
          data={data}
        />
      </Modal>
    </>
  );
};

export default ReservationOrder;
