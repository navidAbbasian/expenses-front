import { useQuery } from '@tanstack/react-query';

const useSearchQuery = (
    debouncedSearchTerm,
    query,
    searchFunction,
    searchFields
) => {
    const { data: searchedData, isLoading: isSearchLoading } = useQuery({
        queryKey: ['search', debouncedSearchTerm],
        queryFn: ({ signal }) => {
            if (query) {
                const searchString = searchFields
                    .map((field) => `${field}:${debouncedSearchTerm}`)
                    .join(';');
                return searchFunction(`search=${searchString}`, signal);
            } else {
                return { data: { data: [] } };
            }
        },
    });

    return { searchedData, isSearchLoading };
};

export default useSearchQuery;
