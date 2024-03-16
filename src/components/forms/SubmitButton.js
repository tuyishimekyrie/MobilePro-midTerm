import React from "react";
import { useFormikContext } from "formik";

import WelcomeBtn from "../button/welcome";

function SubmitButton({ title, navigateWhere, style }) {
  const { handleSubmit } = useFormikContext();

  const handlePress = () => {
    handleSubmit(); // Submit the form
    if (navigateWhere) { 
      navigateWhere(); // Navigate to the specified destination
    }
  };

  return <WelcomeBtn title={title} onPress={handlePress} style={style} />;
}

export default SubmitButton;
