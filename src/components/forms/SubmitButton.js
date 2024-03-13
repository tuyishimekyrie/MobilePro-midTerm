import React from "react";
import { useFormikContext } from "formik";

import WelcomeBtn from "../button/welcome";

function SubmitButton({ title, navigateWhere }) {
  const { handleSubmit } = useFormikContext();

  const handlePress = () => {
    handleSubmit(); // Submit the form
    navigateWhere(); // Navigate to the specified destination
  };

  return <WelcomeBtn title={title} onPress={handlePress} />;
}

export default SubmitButton;
