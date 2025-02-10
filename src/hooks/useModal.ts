import { useCallback, useState } from "react";

interface ModalStateTypes {
  [key: string]: boolean;
}

const useModal = (initialState: ModalStateTypes = {}) => {
  const [modals, setModals] = useState<ModalStateTypes>(initialState);

  const openModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: true }));
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: false }));
  }, []);

  return {
    modals,
    openModal,
    closeModal,
  };
};

export default useModal;
