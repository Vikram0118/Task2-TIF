import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails, InitialValuesType } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC = () => {
  const { 
    handleChange, 
    errors, 
    touched, 
    handleBlur, 
    handleSubmit, 
    values,
    setValues
    } = useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),
      onSubmit: (values) => {
        setIntTab(true)
        setActiveTab("interview")
      },
    });

  
    const { state, setJobDetails, setIntTab, setActiveTab } = useData() as  { state:InitialValuesType, setJobDetails: (formData: IJobDetails) => void, setIntTab: (value: boolean) => void, setActiveTab: (tab: "requisition" | "job" | "interview") => void };
  
    useEffect (() => {
      setValues(state.jobDetails);
    }, [])
  
    useEffect (() => {
      setJobDetails(values)
    }, [values])

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => setActiveTab("requisition")}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" >
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
