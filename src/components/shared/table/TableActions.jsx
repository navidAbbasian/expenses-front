import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

const TableActions = (props) => {
    const {
        onEdit,
        onDelete,
        itemName,
        rowID,
        itemData,
        showEditTooltip,
        showDeleteTooltip,
    } = props;

    return (
        <>
            {showDeleteTooltip && (
                <Tooltip title="حذف ردیف">
                    <IconButton
                        size="small"
                        onClick={() => onDelete(rowID, itemName)}
                    >
                        <Icon icon="mdi:delete-outline" />
                    </IconButton>
                </Tooltip>
            )}
            {showEditTooltip && (
                <Tooltip title="ویرایش ردیف">
                    <IconButton
                        size="small"
                        onClick={() => onEdit(rowID, itemName, itemData)}
                    >
                        <Icon icon="mdi:pencil-outline" fontSize={20} />
                    </IconButton>
                </Tooltip>
            )}
        </>
    );
};

TableActions.propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    itemName: PropTypes.string,
    rowID: PropTypes.string,
    itemData: PropTypes.object,
    showEditTooltip: PropTypes.bool,
    showDeleteTooltip: PropTypes.bool,
};

TableActions.defaultProps = {
    showEditTooltip: true,
    showDeleteTooltip: true,
};

export default TableActions;
