import { useState } from "react";

type VisibilityState = {
  [key: string]: boolean;
};

const useShowHidePassword = () => {
  const [visibility, setVisibility] = useState<VisibilityState>({});

  const handleShowPassword = (field: string) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  return { visibility, handleShowPassword };
};

export default useShowHidePassword;
