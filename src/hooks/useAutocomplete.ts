import { useState } from "react";

const useAutocomplete = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    total: 0,
    lastPage: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});

  return {
    paginationModel,
    setPaginationModel,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
  };
};

export default useAutocomplete;
