import { CustomButton, RecursiveContainer } from "@/components";
import { CustomCard } from "@/components/common/custom-card";
import { CONFIG_TYPE } from "@/model";
import { getError } from "@/utils";
import { useFormik } from "formik";
import { useState } from "react";
import { placeApi } from "@/api";
import { useRouter } from "next/router";

export const AddPlaceContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await placeApi.addPlace(data);
      window.flash({ message: "Added Successfully" });
      push("/admin/place");
    } catch (err) {
      window.flash({ message: getError(err).message, variant: "error" });
    }
    setLoading(false);
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
      cardHeader={{
        header: {
          title: "Add Place",
          props: { variant: "h4" },
          description: { title: "Fill in the details" },
        },
        headerInsideCard: true,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <RecursiveContainer formik={formik} config={fields} />
        <CustomButton type="submit" loading={loading}>
          Add Place
        </CustomButton>
      </form>
    </CustomCard>
  );
};
