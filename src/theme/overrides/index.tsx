import { Components, Theme } from "@mui/material/styles";
import MuiDataGrid from "./dataGrid";
import MuiDatePicker from "./datePicker";

const Overrides = (): { components: Components<Omit<Theme, "components">> } => {
  const dataGrid = MuiDataGrid();
  const datePicker = MuiDatePicker();

  return {
    components: {
      MuiDataGrid: dataGrid.MuiDataGrid,
      ...datePicker,
    },
  };
};

export default Overrides;
