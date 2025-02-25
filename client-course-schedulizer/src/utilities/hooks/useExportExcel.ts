/* eslint-disable sort-keys-fix/sort-keys-fix */
import * as XLSX from "xlsx";
import download from "js-file-download";
import moment from "moment";
import { useContext } from "react";
import { AppContext } from "utilities/contexts";

const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return "";
  return Number.isInteger(num) ? Math.floor(num).toString() : num.toFixed(1);
};

const formatTime = (time: string | undefined): string => {
  if (!time) return "";
  return moment(time, "h:mm A").format("HH:mm:00");
};

export const useExportExcel = () => {
  const {
    appState: { schedule },
  } = useContext(AppContext);

  const onExportExcelClick = () => {
    // Build export data from schedule
    const exportData: any[] = [];
    schedule.courses.forEach((course: any) => {
      course.sections.forEach((section: any) => {
        const row = {
          Department: course.department ?? "",
          AcademicYear: section.year ?? "",
          Term: section.term ?? "",
          TermPart: section.semesterLength ?? "",
          Prefix: Array.isArray(course.prefixes) ? course.prefixes.join(", ") : (course.prefix ?? ""),
          CourseNumber: course.number ?? "",
          Section: section.letter ?? "",
          Faculty: Array.isArray(section.instructors) ? section.instructors.join(", ") : (section.instructors ?? ""),
          FacultyLoad: formatNumber(section.facultyHours),
          MinimumCredits: formatNumber(section.studentHours),
          MaximumCredits: formatNumber(section.meetings?.[0]?.location?.roomCapacity),
          MeetingDays: section.meetings ? section.meetings.map((m: any) => {
            return m.days ? m.days.map((day: string) => {return day === "TH" ? "R" : day}).join("") : "";
          }).join("; ") : "",
          StartTime: section.meetings && section.meetings.length > 0 ? formatTime(section.meetings[0].startTime) : "",
          MeetingDuration: section.meetings && section.meetings.length > 0 ? section.meetings[0].duration ?? "" : "",
          Classroom: section.meetings ? section.meetings.map((m: any) => {return m.location ? `${m.location.building} ${m.location.roomNumber}` : "";}).join(", ") : "",
          ShortTitle: course.name ?? "",
          InstructionalMethod: section.instructionalMethod ?? "",
          CourseLevel: course.courseLevel ?? "",
          Group: course.group ?? "",
          Comment: course.comment ?? "",
          Enrollment: section.anticipatedSize ?? 0,
          EnrollmentDay10: section.day10Used ?? 0,
        };
        exportData.push(row);
      });
    });

    // Define header order for sheet
    const headers = [
      "Department",
      "AcademicYear",
      "Term",
      "TermPart",
      "Prefix",
      "CourseNumber",
      "Section",
      "Faculty",
      "FacultyLoad",
      "MinimumCredits",
      "MaximumCredits",
      "MeetingDays",
      "StartTime",
      "MeetingDuration",
      "Classroom",
      "ShortTitle",
      "InstructionalMethod",
      "CourseLevel",
      "Group",
      "Comment",
      "Enrollment",
      "EnrollmentDay10",
    ];

    // Create worksheet with headers in the specified order
    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");

    // Generate Excel buffer and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    download(excelBuffer, `schedule_${moment().format("YYYY-MM-DD_HH-mm-ss")}.xlsx`);
  };

  return onExportExcelClick;
};
