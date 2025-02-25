import { useContext } from "react";
import * as XLSX from "xlsx";
import download from "js-file-download";
import moment from "moment";
import { AppContext } from "utilities/contexts";

export const useExportExcel = () => {
  const {
    appState: { schedule },
  } = useContext(AppContext);

  const onExportExcelClick = () => {
    // Convert schedule object to array format
    const scheduleArray = Object.values(schedule);
    const worksheet = XLSX.utils.json_to_sheet(scheduleArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");

    // Generate Excel file buffer.
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    download(excelBuffer, `schedule_${moment().format("YYYY-MM-DD_HH-mm-ss")}.xlsx`);
  };

  return onExportExcelClick;
};
