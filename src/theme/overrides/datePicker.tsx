const MuiDatePicker = () => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            height: "40px",
            width: "100%",
            flexDirection: "row-reverse",
          },
          "& .MuiInputLabel-outlined": {
            transform: "translate(10px, 9px) scale(1)",
          },
          "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: "translate(15px, -8px) scale(0.75)",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "white",
          },
        },
      },
    },
    MuiPickersYear: {
      styleOverrides: {
        yearButton: {
          "&.Mui-selected": {
            color: "white",
          },
        },
      },
    },
  };
};

export default MuiDatePicker;
