import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableActions from '../../../shared/table/TableActions';
import { Icon } from '@iconify/react';

const TransactionsColumns = ({ onDelete }) => {
    const columns = [
        {
            minWidth: 190,
            sortable: true,
            field: 'amount',
            headerName: 'مقدار',
            renderCell: ({ row }) => {
                return (
                    <Typography noWrap variant="subtitle1">
                        {row?.amount?.toLocaleString()} تومان
                    </Typography>
                );
            },
        },
        {
            minWidth: 250,
            sortable: true,
            field: 'description',
            headerName: 'توضیحات',
            renderCell: ({ row }) => {
                return (
                    <Typography noWrap variant="subtitle1">
                        {row?.description}
                    </Typography>
                );
            },
        },
        {
            minWidth: 250,
            sortable: true,
            field: 'type',
            headerName: 'نوع',
            renderCell: ({ row }) => {
                return (
                    <Typography noWrap variant="subtitle1">
                        {row?.type == 'income' ? 'درآمد' : 'هزینه'}
                    </Typography>
                );
            },
        },
        {
            minWidth: 250,
            sortable: true,
            field: 'from',
            headerName: 'از بانک',
            renderCell: ({ row }) => {
                return (
                    <>
                        {row?.from ? (
                            <Typography
                                noWrap
                                variant="subtitle1"
                                sx={{ pr: 1 }}
                            >
                                {row?.from}
                            </Typography>
                        ) : (
                            <Icon
                                icon="line-md:close-small"
                                fontSize={22}
                                width="22"
                                height="22"
                                color="red"
                            />
                        )}
                    </>
                );
            },
        },
        {
            minWidth: 250,
            sortable: true,
            field: 'to',
            headerName: 'به بانک',
            renderCell: ({ row }) => {
                return (
                    <>
                        {row?.to ? (
                            <Typography
                                noWrap
                                variant="subtitle1"
                                sx={{ pr: 1 }}
                            >
                                {row?.to}
                            </Typography>
                        ) : (
                            <Icon
                                icon="line-md:close-small"
                                fontSize={22}
                                width="22"
                                height="22"
                                color="red"
                            />
                        )}
                    </>
                );
            },
        },
        {
            minWidth: 160,
            sortable: false,
            field: 'actions',
            headerName: 'اقدام',
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TableActions
                        showEditTooltip={false}
                        rowID={row?.id}
                        itemName={'تراکنش مد نظر'}
                        onDelete={onDelete}
                    />
                </Box>
            ),
        },
    ];
    return columns;
};

export default TransactionsColumns;
