/* eslint-disable sort-keys-fix/sort-keys-fix */
import * as XLSX from "xlsx";
import download from "js-file-download";
import moment from "moment";
import { useContext } from "react";
import { AppContext } from "utilities/contexts";

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
          Department: course.department || "",
          AcademicYear: course.academicYear || "",
          Term: section.term || "",
          TermPart: section.semesterLength || "",
          Prefix: course.prefix || "",
          CourseNumber: course.number || "",
          Section: section.letter || "",
          Faculty:
            Array.isArray(section.instructors) && section.instructors.length > 0
              ? section.instructors.join(", ")
              : section.instructors || "",
          FacultyLoad: course.facultyHours || "",
          MinimumCredits: course.studentHours || "",
          MaximumCredits: course.roomCapacity || "",
          MeetingDays: section.meetings
            ? section.meetings
                .map((m: any) => {return (m.days ? m.days.join(",") : "")})
                .join("; ")
            : "",
          StartTime:
            section.meetings && section.meetings.length > 0
              ? section.meetings[0].startTime || ""
              : "",
          MeetingDuration:
            section.meetings && section.meetings.length > 0
              ? section.meetings[0].duration || ""
              : "",
          Classroom: section.meetings
            ? section.meetings.map((m: any) => {return m.location || ""}).join(", ")
            : "",
          ShortTitle: course.name || "",
          InstructionalMethod: section.instructionalMethod || "",
          CourseLevel: course.courseLevel || "",
          Group: course.group || "",
          Comment: course.comment || "",
          Enrollment: course.anticipatedSize || "",
          EnrollmentDay10: course.day10Used || "",
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
