import moment from "jalali-moment";
import { useEffect, useState } from "react";

const useMiladiToShamsiConvertor = (date: Date, format = "YYYY/MM/DD") => {
  const [convertedDate, setConvertedDate] = useState("");

  useEffect(() => {
    if (date) {
      const formattedDate = moment(date).locale("fa").format(format);
      setConvertedDate(formattedDate);
    }
  }, [date, format]);

  return convertedDate;
};

export default useMiladiToShamsiConvertor;
