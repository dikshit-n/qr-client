import { CustomButton, RecursiveContainer } from "@/components";
import { CustomCard } from "@/components/common/custom-card";
import { CONFIG_TYPE } from "@/model";
import { getError } from "@/utils";
import { useFormik } from "formik";
import { useState } from "react";
import { userApi } from "@/api";
import { useRouter } from "next/router";

export const AddEmployeeContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await userApi.addEmployee(data);
      window.flash({ message: "Added Successfully" });
      push("/admin/employee");
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "employee",
    },
    onSubmit: handleSubmit,
  });

  const fields: CONFIG_TYPE = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      type: "password",
      label: "Create Password",
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone Number",
    },
  ];

  return (
    <CustomCard
      cardHeader={{
        header: {
          title: "Add Employee",
          props: { variant: "h4" },
          description: { title: "Fill in the details" },
        },
        headerInsideCard: true,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer formik={formik} config={fields} />
        <CustomButton type="submit" loading={loading}>
          Add User
        </CustomButton>
      </form>
    </CustomCard>
  );
};
