import { useState } from "react";

const useServerError = () => {
  const [serverError, setServerError] = useState<
    Record<string, any> | null | undefined
  >(null);

  return {
    serverError,
    setServerError,
  };
};

export default useServerError;
