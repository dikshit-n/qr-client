import { EmployeeDashboard } from "@/content/employee";
import { Authenticated } from "@/guard";
import { EmployeeLayout } from "@/layouts";
import { NextPage } from "next";

const EmployeeHome: NextPage = (props) => {
  return <EmployeeDashboard />;
};

EmployeeHome.getLayout = (page) => (
  <Authenticated roles={["employee"]}>
    <EmployeeLayout>{page}</EmployeeLayout>
  </Authenticated>
);

export default EmployeeHome;
