import {
    DataGrid,
    faIR,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

import useModalActions from '../../../../hooks/useModalActions';
import useSearchQuery from '../../../../hooks/useSearchQuery';
import FormAlert from '../../../shared/alerts/FormAlert';
import DeleteModal from '../../../shared/modal/DeleteModal';
import TableContainer from '../../../shared/table/TableContainer';
import BanksColumns from './BanksColumns';
import { banksListReq, banksListSearchReq, deleteBankReq } from '../../../../api/requests';
import EditBank from './../edit/EditBank';

function CustomToolbar() {
    return (
        <GridToolbarContainer
            sx={{ ml: '5px', mb: '5px', justifyContent: 'flex-start' }}
        >
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const BankList = () => {
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
        openEditModal,
        setOpenEditModal,
        handleCloseDeleteModal,
        handleCloseEditModal,
        itemId,
        handleDelete,
        handleEdit,
        itemName,
    } = useModalActions();

    // fetch banks
    const { data, isLoading, isSuccess, isFetching, isPending } = useQuery({
        queryKey: ['banks', paginationModel.page + 1],
        queryFn: ({ signal }) => {
            return banksListReq(paginationModel.page + 1, signal);
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (isSuccess) {
            const { total, to, per_page } = data.data;
            setPaginationInfo({ total, to, per_page });
            setPaginationModel({ ...paginationModel, pageSize: per_page });
        }
    }, [isFetching]);

    console.log('data in banks', data);

    const queryClient = useQueryClient();

    // prefetch next page
    const prefetchQuery = (nextPage) => {
        queryClient.prefetchQuery({
            queryKey: ['banks', nextPage],
            queryFn: ({ signal }) => banksListReq(nextPage, signal),
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
    const searchFields = ['title'];

    const { searchedData, isSearchLoading } = useSearchQuery(
        debouncedSearchTerm,
        true,
        banksListSearchReq,
        searchFields
    );

    return (
        <TableContainer
            title="لیست بانک‌ها"
            isLoading={isLoading || isSearchLoading}
            handleFilter={handleFilter}
            value={query}
            placeholder="جست و جو بر اساس عنوان"
        >
            <DataGrid
                slots={{ toolbar: CustomToolbar }}
                autoHeight
                getRowId={(row) => row?.id}
                rows={query == '' ? data?.data?.data : searchedData?.data?.data}
                columns={BanksColumns({
                    onDelete: handleDelete,
                    onEdit: handleEdit,
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
                    reqFn={deleteBankReq}
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
            {openEditModal ? (
              <EditBank
                  items={{
                      openEditModal,
                      setOpenEditModal,
                      handleCloseEditModal,
                      itemId,
                      itemName,
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

export default BankList;
