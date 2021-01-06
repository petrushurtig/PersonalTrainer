import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import 'whatwg-fetch';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  AppointmentTooltip,
  Toolbar,
  DateNavigator, 
  ViewSwitcher,
  Appointments,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';

function Schedule(props) {
    const[trainings, setTrainings] = useState([]);
   
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(res => res.json())
        .then(data => setTrainings(data))
        .catch(err => {
            console.log(err)
        })
      }
      const appointments = trainings.map(trainings => {
            var s = new Date(trainings.date)
            var e = new Date(s);
            e.setMinutes( s.getMinutes() + trainings.duration);
          return {
              title: trainings.activity + " / " + trainings.customer.firstname + " " + trainings.customer.lastname,
              startDate: s,
              endDate: e
          }
      } )
    const currentDate = new Date();    
    return(
      <div className="schedule">
     <Paper>
       <Scheduler
         data={appointments}
        height={750}
       >
       <ViewState
           defaultCurrentDate={currentDate}
           defaultCurrentViewName="Month"
       />
         <DayView
           startDayHour={5}
           endDayHour={22}
         />
            <WeekView 
            startDayHour={5}
            endDayHour={22}
            />   
         <MonthView  />
         <Toolbar />
         <DateNavigator />
         <TodayButton />
         <ViewSwitcher />
         <Appointments />
         <AppointmentTooltip 
         showCloseButton="true"/>
       </Scheduler>
     </Paper>
     </div>
   );
    } 
    export default Schedule;
