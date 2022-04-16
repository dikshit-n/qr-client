import { CustomButton, RecursiveContainer } from "@/components";
import { CustomCard } from "@/components/common/custom-card";
import { CONFIG_TYPE } from "@/model";
import { getError } from "@/utils";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { userApi } from "@/api";
import { useRouter } from "next/router";

export const EditEmployeeContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { query, push } = useRouter();
  const _id = query._id as string;

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const details = await userApi.fetchEmployee(_id);
      formik.resetForm({ values: details });
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setLoading(false);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await userApi.editEmployee({ ...data, _id });
      window.flash({ message: "Updated Successfully" });
      push("/admin/employee");
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setSubmitting(false);
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
      label: "Edit Password",
    },
    {
      name: "phone",
      type: "phone",
      label: "Phone Number",
    },
  ];

  return (
    <CustomCard
      loading={loading}
      cardHeader={{
        header: {
          title: "Edit Employee",
          props: { variant: "h4" },
          description: { title: "Edit details" },
        },
        headerInsideCard: true,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer formik={formik} config={fields} />
        <CustomButton type="submit" loading={submitting}>
          Update
        </CustomButton>
      </form>
    </CustomCard>
  );
};
