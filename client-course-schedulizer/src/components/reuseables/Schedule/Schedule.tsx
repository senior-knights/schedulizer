import { CalendarOptions, EventClickArg } from "@fullcalendar/react";
import { Popover } from "@material-ui/core";
import { AddSectionPopover, AsyncComponent, Calendar, ScheduleToolbar } from "components";
import { bindPopover, usePopupState } from "material-ui-popup-state/hooks";
import React, { useCallback, useContext, useMemo, useState } from "react";
import Stick from "react-stick";
import StickyNode from "react-stickynode";
import { CourseSectionMeeting } from "utilities";
import { AppContext, ScheduleContext } from "utilities/contexts";
import {
  filterEventsByTerm,
  filterHeadersWithNoEvents,
  getHoursArr,
  GroupedEvents,
} from "utilities/services";
import "./Schedule.scss";

interface ScheduleBase extends CalendarOptions {
  calendarHeaders: string[];
  groupedEvents: GroupedEvents;
}

/* Provides a Schedule component to handle loading and async events and interfaces
  with a BaseSchedule.
*/
export const Schedule = (props: ScheduleBase) => {
  const [isScheduleLoading, setIsScheduleLoading] = useState(false);

  return (
    <ScheduleContext.Provider value={{ isScheduleLoading, setIsScheduleLoading }}>
      <AsyncComponent isLoading={isScheduleLoading}>
        <AsyncComponent.Loading>Updating Schedule...</AsyncComponent.Loading>
        <AsyncComponent.Loaded>
          <ScheduleBase {...props} />
        </AsyncComponent.Loaded>
      </AsyncComponent>
    </ScheduleContext.Provider>
  );
};

/* Creates a list of Calendars to create a Schedule
  <Stick> is used to stick the Schedule Header to the Schedule
  to track horizontal scrolling.
*/
const ScheduleBase = ({ calendarHeaders, groupedEvents, ...calendarOptions }: ScheduleBase) => {
  const {
    appState: { selectedTerm, slotMaxTime, slotMinTime, schedule },
  } = useContext(AppContext);
  const [popupData, setPopupData] = useState<CourseSectionMeeting>();

  const popupState = usePopupState({
    popupId: "addSection",
    variant: "popover",
  });

  const handleEventClick = useCallback(
    (arg: EventClickArg) => {
      setPopupData(arg.event.extendedProps as CourseSectionMeeting);
      popupState.open(arg.el);
    },
    [popupState],
  );

  const times = {
    slotMaxTime,
    slotMinTime,
  };

  // Add context times to the existing calendarOptions
  calendarOptions = {
    ...calendarOptions,
    ...times,
  };

  // Filter out events from other terms
  const filteredEvents = useMemo(() => {
    return filterEventsByTerm(groupedEvents, selectedTerm);
  }, [groupedEvents, selectedTerm]);

  // Filter out headers with no events
  const calenderHeadersNoEmptyInTerm = useMemo(() => {
    return filterHeadersWithNoEvents(filteredEvents, calendarHeaders);
  }, [filteredEvents, calendarHeaders]);

  return (
    <>
      <ScheduleToolbar />
      <div className="schedule-time-axis-wrapper">
        <LeftTimeAxis {...times} />
        <div className="schedule-wrapper">
          <Stick
            node={<ScheduleHeader headers={calenderHeadersNoEmptyInTerm} />}
            position="top left"
          >
            <div className="adjacent">
              {calenderHeadersNoEmptyInTerm.map((header) => {
                return (
                  <div key={header} className="calendar-width hide-axis">
                    <Calendar
                      {...calendarOptions}
                      key={header}
                      eventClick={handleEventClick}
                      events={filteredEvents[header]}
                    />
                  </div>
                );
              })}
            </div>
          </Stick>
        </div>
      </div>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        PaperProps={{ style: { maxWidth: "50%", minWidth: "500px" } }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <AddSectionPopover values={popupData} />
      </Popover>
    </>
  );
};

interface LeftTimeAxis {
  slotMaxTime: string;
  slotMinTime: string;
}

/* Display the hours on the left axis of the schedule
 */
const LeftTimeAxis = ({ slotMinTime: min, slotMaxTime: max }: LeftTimeAxis) => {
  return (
    <div className="left-time-axis">
      {getHoursArr(min, max).map((time) => {
        return (
          <div key={time} className="time-slot">
            <span>{`${time}:00`}</span>
          </div>
        );
      })}
    </div>
  );
};

interface ScheduleHeader {
  headers: ScheduleBase["calendarHeaders"];
}

const tenVH = window.innerHeight / 10;

/*
  StickyHeader is used to keep the Schedule header sticky to the
  top of the view port.
*/
const ScheduleHeader = ({ headers }: ScheduleHeader) => {
  return (
    <StickyNode top={tenVH}>
      <div className="adjacent schedule-header-row">
        {headers.map((header) => {
          return (
            <div key={header} className="calendar-width calendar-title">
              {header}
            </div>
          );
        })}
      </div>
    </StickyNode>
  );
};
