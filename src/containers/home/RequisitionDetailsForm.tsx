import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useData } from "./DataProvider";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails, InitialValuesType } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";


const RequisitionDetailsForm: React.FC = () => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    setValues
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .integer("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      setReqDetails(values)
      setJobTab(true)
      setActiveTab("job")
    },
    enableReinitialize :true
  });

  const { state, setReqDetails, setJobTab, setActiveTab} = useData() as { state:InitialValuesType, setReqDetails: (formData: IRequisitionDetails) => void, setJobTab : (value: boolean) => void, setActiveTab : (tab: "requisition" | "job" | "interview") => void};
  
  useEffect (() => {
    setValues(state.requisitionDetails);
  }, [])

  useEffect(() => {
    // setReqDetails(values)
  
    setReqDetails({
      ...values,
      noOfOpenings: Number(values.noOfOpenings),
    });
  }, [values]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={Number(values?.noOfOpenings)}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
