import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableActions from '../../../shared/table/TableActions';

const TagsColumns = ({ onDelete, onEdit }) => {
    const columns = [
        {
            minWidth: 190,
            sortable: true,
            field: 'name',
            headerName: 'نام',
            renderCell: ({ row }) => {
                return (
                    <Typography noWrap variant="subtitle1">
                        {row?.name}
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
            minWidth: 160,
            sortable: false,
            field: 'actions',
            headerName: 'اقدام',
            renderCell: ({ row }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TableActions
                        rowID={row?.id}
                        itemName={row?.name}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </Box>
            ),
        },
    ];
    return columns;
};

export default TagsColumns;
