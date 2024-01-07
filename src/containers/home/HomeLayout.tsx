import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { useData } from "./DataProvider";

const CustomTab: React.FC<TabProps> = ({ children, isDisabled }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" isDisabled={isDisabled}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {

  const { jobTab, intTab, activeTab } = useData() as { jobTab: Boolean, intTab: Boolean, activeTab : "requisition" | "job" | "interview"};

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs isLazy index={activeTab == "requisition" ? 0 : activeTab == "job" ? 1 : 2}>
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab isDisabled={!jobTab}>Job Details</CustomTab>
            <CustomTab isDisabled={!intTab}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm />
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
