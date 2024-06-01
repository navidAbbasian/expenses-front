const DataGrid = () => {
    return {
        MuiDataGrid: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: 0,
                    color: theme.palette.text.primary,
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
                        {
                            outline: 'none',
                        },
                }),
                toolbarContainer: ({ theme }) => ({
                    ' .MuiButtonBase-root': {
                        gap: '8px',
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                            color: "white"
                        },
                    },
                    m: 3
                }),
                columnHeaders: () => ({
                    backgroundColor: '#F5F5F7',
                }),
                columnHeader: ({ theme }) => ({
                    '&:not(.MuiDataGrid-columnHeaderCheckbox)': {
                        paddingLeft: theme.spacing(4),
                        paddingRight: theme.spacing(4),
                        '&:first-of-type': {
                            paddingLeft: theme.spacing(5),
                        },
                    },
                    '&:last-of-type': {
                        paddingRight: theme.spacing(5),
                    },
                }),
                columnHeaderCheckbox: {
                    maxWidth: '58px !important',
                    minWidth: '58px !important',
                },
                columnHeaderTitleContainer: {
                    padding: 0,
                },
                columnHeaderTitle: {
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.17px',
                    textTransform: 'uppercase',
                },
                columnSeparator: ({ theme }) => ({
                    color: '#fff',
                }),
                row: {
                    '&:last-child': {
                        '& .MuiDataGrid-cell': {
                            borderBottom: 0,
                        },
                    },
                },
                cell: ({ theme }) => ({
                    borderColor: theme.palette.divider,
                    '&:not(.MuiDataGrid-cellCheckbox)': {
                        paddingLeft: theme.spacing(4),
                        paddingRight: theme.spacing(4),
                        '&:first-of-type': {
                            paddingLeft: theme.spacing(5),
                        },
                    },
                    '&:last-of-type': {
                        paddingRight: theme.spacing(5),
                    },
                    '&:focus, &:focus-within': {
                        outline: 'none',
                    },
                }),
                cellCheckbox: {
                    maxWidth: '58px !important',
                    minWidth: '58px !important',
                },
                editInputCell: ({ theme }) => ({
                    padding: 0,
                    color: theme.palette.secondary.main,
                    '& .MuiInputBase-input': {
                        padding: 0,
                    },
                }),
                footerContainer: ({ theme }) => ({
                    borderTop: `1px solid ${theme.palette.divider}`,
                    '& .MuiTablePagination-toolbar': {
                        paddingLeft: `${theme.spacing(4)} !important`,
                        paddingRight: `${theme.spacing(4)} !important`,
                    },
                    '& .MuiTablePagination-select': {
                        color: theme.palette.secondary.main,
                    },
                }),
                selectedRowCount: ({ theme }) => ({
                    margin: 0,
                    paddingLeft: theme.spacing(4),
                    paddingRight: theme.spacing(4),
                }),
            },
        },
    };
};

export default DataGrid;
