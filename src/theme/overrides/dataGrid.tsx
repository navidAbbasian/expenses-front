import { Theme } from "@mui/material/styles";

const MuiDataGrid = () => {
  return {
    MuiDataGrid: {
      defaultProps: {
        slotProps: {
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        },
      },
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => ({
          border: "none",
          color: theme.palette.primary.dark,
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },
          "& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
            backgroundColor: "#F2F4F8 !important",
          },
          "& .MuiDataGrid-topContainer": {
            backgroundColor: "#D8DEEA !important",
          },
          "& MuiDataGrid-root": {
            boxShadow: "none !important",
          },
          "& .MuiTypography-root": {
            fontSize: "14px",
            fontWeight: "550",
          },
          "& .MuiDivider-root": {
            border: "none",
          },
        }),
        toolbarContainer: () => ({
          ".MuiButtonBase-root": {
            gap: "8px",
          },
          m: 3,
        }),
        columnHeaders: () => ({
          backgroundColor: "#D8DEEA",
        }),
        columnHeader: ({ theme }: { theme: Theme }) => ({
          borderRight: "1px solid #dbdbdb",
          "&:not(.MuiDataGrid-columnHeaderCheckbox)": {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            "&:first-of-type": {
              paddingLeft: theme.spacing(5),
            },
          },
          "&:last-of-type": {
            paddingRight: theme.spacing(5),
          },
        }),
        columnHeaderCheckbox: {
          maxWidth: "58px !important",
          minWidth: "58px !important",
        },
        columnHeaderTitleContainer: {
          padding: 0,
        },
        columnHeaderTitle: {
          fontSize: "0.75rem",
          letterSpacing: "0.17px",
          textTransform: "uppercase",
          color: "#4E6590",
        },
        columnSeparator: () => ({
          display: "none",
        }),
        row: {
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
          "&:last-child": {
            "& .MuiDataGrid-cell": {
              borderBottom: 0,
              display: "flex",
              alignItems: "center",
            },
          },
          "&:first-child": {
            "& .MuiDataGrid-cell": {
              borderTop: 0,
              display: "flex",
              alignItems: "center",
            },
          },
        },
        cell: ({ theme }: { theme: Theme }) => ({
          borderRight: "0.5px solid #dbdbdb",
          "&:not(.MuiDataGrid-cellCheckbox)": {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            "&:first-of-type": {
              paddingLeft: theme.spacing(5),
            },
          },
          "&:last-of-type": {
            borderRight: 0,
            paddingRight: theme.spacing(5),
          },
          "&:focus, &:focus-within": {
            outline: "none",
          },
        }),
        cellCheckbox: {
          maxWidth: "58px !important",
          minWidth: "58px !important",
        },
        editInputCell: ({ theme }: { theme: Theme }) => ({
          padding: 0,
          color: theme.palette.secondary.main,
          "& .MuiInputBase-input": {
            padding: 0,
          },
        }),
      },
    },
  };
};

export default MuiDataGrid;
