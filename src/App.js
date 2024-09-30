import { useCallback, useState, useEffect } from "react";
import "./index.css";
import { BiArchive } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  //getting data from data.json file with UseEffect
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");

  //sorting by petName (default)
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList
    .filter(
      (item) => {
        return (
          item.petName.toLowerCase().includes(query.toLowerCase()) ||
          item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
          item.aptNotes.toLowerCase().includes(query.toLowerCase()) ||
          item.aptDate.toLowerCase().includes(query.toLowerCase())
        );
      } //implementating sorting algorithm
    )
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-semibold">
      <h1 className="text-5xl mb-3">
        <BiArchive className="inline-block text-blue-800 align-top" /> Your
        Appointment{" "}
      </h1>
      <AddAppointment
        onSendAppointment = {myAppointment => setAppointmentList([...appointmentList, myAppointment])}
        lastId = {appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)} 
      />
      <Search 
        query={query} 
        onQueryChange={(myQueery) => setQuery(myQueery)}
        orderBy={orderBy}
        onOrderByChange  = {mySort => setOrderBy (mySort)}
        sortBy={sortBy}
        onSortByChange = {mySort => setSortBy(mySort)} 
      />

      {/* mapping the data json file */}
      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={(appointmentId /*delete the appointment */) =>
              setAppointmentList(
                appointmentList.filter(
                  (appointment) => appointment.id === appointmentId
                )
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
