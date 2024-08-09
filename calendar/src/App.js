import React, { useState } from 'react';
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';

const currentDate = new Date();
const schedulerData = [];

const App = () => {
  const [data, setData] = useState(schedulerData);

  const commitChanges = ({ added, changed, deleted }) => {
    let newData = [...data];

    if (added) {
      const startingAddedId = newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
      newData = [...newData, { id: startingAddedId, ...added }];
    }
    if (changed) {
      newData = newData.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
      ));
    }
    if (deleted !== undefined) {
      newData = newData.filter(appointment => appointment.id !== deleted);
    }
    setData(newData);
  };

  return (
    <Paper>
      <Scheduler data={data} locale="pl-PL">
        <ViewState defaultCurrentDate={currentDate} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={8} endDayHour={20} />
        <WeekView startDayHour={8} endDayHour={20} />
        <MonthView />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
};

export default App;