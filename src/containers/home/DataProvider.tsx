import React, { createContext, useContext, useState } from "react";
import { IInterViewSettings, IJobDetails, IRequisitionDetails, InitialValuesType } from "@src/interface/forms";
import { string } from "yup";

const initialValues = {

  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};


// context
const DataContext = createContext<{
  state: InitialValuesType;
  setState: React.Dispatch<React.SetStateAction<InitialValuesType>>;
  setReqDetails: (formData: IRequisitionDetails) => void;
  setJobDetails: (formData: IJobDetails) => void;
  setInerSettings: (formData: IInterViewSettings) => void;
  jobTab: Boolean;
  intTab: Boolean;
  setJobTab: (value: boolean) => void;
  setIntTab: (value: boolean) => void;
  activeTab: "requisition" | "job" | "interview" ;
  setActiveTab: (tab: "requisition" | "job" | "interview") => void;
  clearForm : any;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialValues);

  const [jobTab, setJobTab] = useState(false);
  const [intTab, setIntTab] = useState(false);

  const [activeTab, setActiveTab] = useState("requisition");

  const setReqDetails = (formData: IRequisitionDetails) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: formData,
    }));
  };

  const setJobDetails = (formData: IJobDetails) => {
    setState((prevState) => ({
      ...prevState,
      jobDetails: formData,
    }));
  };

  const clearForm = () => {
    setState(initialValues);
    setIntTab(false)
    setJobTab(false)
    setActiveTab("requisition")
  };

  const setInerSettings = (formData: IInterViewSettings) => {
    setState((prevState) => ({
      ...prevState,
      interviewSettings: formData,
    }));
  };

  return (
    <DataContext.Provider 
      value={{ 
        state, 
        setState, 
        setReqDetails, 
        setJobDetails, 
        setInerSettings, 
        jobTab, 
        intTab, 
        setJobTab, 
        setIntTab, 
        activeTab : activeTab as "requisition" | "job" | "interview", 
        setActiveTab ,
        clearForm
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
