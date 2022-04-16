import { CustomButton, RecursiveContainer } from "@/components";
import { CustomCard } from "@/components/common/custom-card";
import { CONFIG_TYPE } from "@/model";
import { getError } from "@/utils";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { placeApi } from "@/api";
import { useRouter } from "next/router";

export const EditPlaceContent: React.FC = () => {
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
      const details = await placeApi.fetchPlace(_id);
      formik.resetForm({ values: details });
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setLoading(false);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await placeApi.editPlace({ ...data, _id });
      window.flash({ message: "Updated Successfully" });
      push("/admin/place");
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: handleSubmit,
  });

  const fields: CONFIG_TYPE = [
    {
      name: "name",
      label: "Name",
    },
  ];

  return (
    <CustomCard
      loading={loading}
      cardHeader={{
        header: {
          title: "Edit Place",
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
