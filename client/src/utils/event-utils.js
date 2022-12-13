let eventGuid = 0
const dateStr = "Novemeber 29 2022 18:00:00 (MST)"

export const INITIAL_EVENTS = [
  {
    id: "313233343536373839303132",
    title: 'The Station Hair Studio',
    startTime: "18:00:00 (MST)",
    endTime: "20:15:00 (MST)",
    daysOfWeek: [1],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'red'
  },
  {
    id: '323233343536373839303132',
    title: 'DECO',
    startTime: "18:00:00 (MST)",
    endTime: "18:15:00 (MST)",
    daysOfWeek: [1, 3],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'green'
  },
  {
    id: '333233343536373839303132',
    title: 'Zandi K Denver West',
    startTime: "18:00:00 (MST)",
    endTime: "19:45:00 (MST)",
    daysOfWeek: [2, 5],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'blue'
  },
  {
    id: "343233343536373839303132",
    title: 'Urban Luxury Salon',
    startTime: "18:00:00 (MST)",
    endTime: "21:30:00 (MST)",
    daysOfWeek: [0, 2, 4],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'cyan',
    textColor: 'black'
  },
  {
    id: "353233343536373839303132",
    title: 'Pure Power Engineering',
    startTime: "18:00:00 (MST)",
    endTime: "20:00:00 (MST)",
    daysOfWeek: [0],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'magenta'
  },
  {
    id: "363233343536373839303132",
    title: 'Glosshouz',
    startTime: "18:00:00 (MST)",
    endTime: "20:00:00 (MST)",
    daysOfWeek: [1],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'yellow',
    textColor: 'black'
  },
  {
    id: "373233343536373839303132",
    title: 'Do The Bang Thing',
    startTime: "18:00:00 (MST)",
    endTime: "22:00:00 (MST)",
    daysOfWeek: [1],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'black'
  },
  {
    id: "383233343536373839303132",
    title: 'Cardiology Now',
    startTime: "18:00:00 (MST)",
    endTime: "20:30:00 (MST)",
    daysOfWeek: [6],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'grey'
  },
  {
    id: "393233343536373839303132",
    title: 'Cedar Hair Studio',
    startTime: "18:00:00 (MST)",
    endTime: "20:30:00 (MST)",
    daysOfWeek: [3],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'purple'
  },
  {
    id: "303233343536373839303132",
    title: 'One 2 One Studio Salon',
    startTime: "18:00:00 (MST)",
    endTime: "20:00:00 (MST)",
    daysOfWeek: [1],
    startRecur: (new Date(dateStr)).toISOString(),
    display: 'block',
    backgroundColor: 'pink',
    textColor: 'black'
  },
]

export function createEventId() {
  return String(eventGuid++)
}




