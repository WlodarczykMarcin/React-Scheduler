import React, { useState, useEffect } from 'react';
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
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const currentDate = new Date();

const App = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "appointments"));
      const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(appointments);
    };

    fetchData();
  }, []);

  const commitChanges = async ({ added, changed, deleted }) => {
    let newData = [...data];

    if (added) {
      const docRef = await addDoc(collection(db, "appointments"), added);
      newData = [...newData, { id: docRef.id, ...added }];
    }
    if (changed) {
      const updatePromises = Object.keys(changed).map(async (id) => {
        const appointmentRef = doc(db, "appointments", id);
        await updateDoc(appointmentRef, changed[id]);
        newData = newData.map(appointment => (
          appointment.id === id ? { ...appointment, ...changed[id] } : appointment
        ));
      });
      await Promise.all(updatePromises);
    }
    if (deleted !== undefined) {
      const appointmentRef = doc(db, "appointments", deleted);
      await deleteDoc(appointmentRef);
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