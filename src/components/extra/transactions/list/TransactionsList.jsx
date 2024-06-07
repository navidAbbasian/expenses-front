import {
    DataGrid,
    faIR,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

import {
    deleteTransactionReq,
    transactionsListReq,
    transactionsListSearchReq,
} from '../../../../api/requests';
import useModalActions from '../../../../hooks/useModalActions';
import useSearchQuery from '../../../../hooks/useSearchQuery';
import FormAlert from '../../../shared/alerts/FormAlert';
import DeleteModal from '../../../shared/modal/DeleteModal';
import TableContainer from '../../../shared/table/TableContainer';
import TransactionsColumns from './TransactionsColumns';

function CustomToolbar() {
    return (
        <GridToolbarContainer
            sx={{ ml: '5px', mb: '5px', justifyContent: 'flex-start' }}
        >
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const TransactionsList = () => {
    // States
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [paginationInfo, setPaginationInfo] = useState(null);
    const [showConfirmAlert, setShowConfirmAlert] = useState(null);
    const [query, setQuery] = useState('');
    const debouncedSearchTerm = useDebounce(query, 500);

    // hook
    const {
        openDeleteModal,
        handleCloseDeleteModal,
        itemId,
        handleDelete,
        itemName,
    } = useModalActions();

    // fetch transactions
    const { data, isLoading, isSuccess, isFetching, isPending } = useQuery({
        queryKey: ['transactions', paginationModel?.page + 1],
        queryFn: ({ signal }) => {
            return transactionsListReq(paginationModel?.page + 1, signal);
        },
        keepPreviousData: true,
    });

    console.log('data', data);

    useEffect(() => {
        if (isSuccess) {
            const { total, to, per_page } = data.data;
            setPaginationInfo({ total, to, per_page });
            setPaginationModel({ ...paginationModel, pageSize: per_page });
        }
    }, [isFetching]);

    const queryClient = useQueryClient();

    // prefetch next page
    const prefetchQuery = (nextPage) => {
        queryClient.prefetchQuery({
            queryKey: ['transactions', nextPage],
            queryFn: ({ signal }) => transactionsListReq(nextPage, signal),
        });
    };

    useEffect(() => {
        if (data?.data?.last_page) {
            prefetchQuery(data?.data?.last_page);
        }
    }, [isPending, paginationModel?.page]);

    // filter
    const handleFilter = async (query) => {
        if (query.trim() !== '') {
            setQuery(query);
        } else {
            setQuery('');
        }
    };

    // search query
    const searchFields = ['amount'];

    const { searchedData, isSearchLoading } = useSearchQuery(
        debouncedSearchTerm,
        true,
        transactionsListSearchReq,
        searchFields
    );

    return (
        <TableContainer
            title="لیست تراکنش‌ها"
            isLoading={isLoading || isSearchLoading}
            handleFilter={handleFilter}
            value={query}
            placeholder="جست و جو بر اساس مقدار"
        >
            <DataGrid
                slots={{ toolbar: CustomToolbar }}
                autoHeight
                getRowId={(row) => row?.id}
                rows={query == '' ? data?.data : searchedData?.data}
                columns={TransactionsColumns({
                    onDelete: handleDelete,
                })}
                checkboxSelection
                disableRowSelectionOnClick
                enableStickyHeader
                paginationModel={paginationModel}
                pageSizeOptions={[5, 10, 15, 100]}
                onPaginationModelChange={setPaginationModel}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        borderRadius: 0,
                    },
                }}
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
                rowCount={paginationInfo?.total}
            />
            {openDeleteModal ? (
                <DeleteModal
                    reqFn={deleteTransactionReq}
                    items={{
                        openDeleteModal,
                        handleCloseDeleteModal,
                        itemId,
                        itemName,
                        setShowConfirmAlert,
                    }}
                />
            ) : (
                ''
            )}
            <FormAlert
                status={showConfirmAlert}
                onClose={() => setShowConfirmAlert(null)}
                successMessage={`${itemName} با موفقیت حذف شد.`}
                errorMessage={`مشکلی در حذف ${itemName} به وجود آمده.`}
            />
        </TableContainer>
    );
};

export default TransactionsList;
