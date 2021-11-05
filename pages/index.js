export default function Events(events) {
  const evenimenteViitoare = events.events.map((event, index) => {
    let today = new Date();
    let eventDate = event[index + 1][2];
    let eventDateObject = new Date(
      eventDate.split("-")[0],
      eventDate.split("-")[1] - 1,
      eventDate.split("-")[2]
    );
    console.log(eventDateObject);
    if (today <= eventDateObject)
      return (
        <li key={index}>
          Nume eveniment: {event[index + 1][0]} cu locatie:{" "}
          {event[index + 1][1]} la data de: {event[index + 1][2]}
        </li>
      );
  });
  const evenimenteTrecute = events.events.map((event, index) => {
    let today = new Date();
    let eventDate = event[index + 1][2];
    let eventDateObject = new Date(
      eventDate.split("-")[0],
      eventDate.split("-")[1] - 1,
      eventDate.split("-")[2]
    );
    console.log(eventDateObject);
    if (today > eventDateObject)
      return (
        <li key={index}>
          Nume eveniment: {event[index + 1][0]} cu locatie:{" "}
          {event[index + 1][1]} la data de: {event[index + 1][2]}
        </li>
      );
  });
  return (
    <>
      <h1>Lista evenimente viitoare</h1>
      <ul>{evenimenteViitoare}</ul>
      <h1>Lista evenimente trecute</h1>
      <ul>{evenimenteTrecute}</ul>
    </>
  );
}

export async function getServerSideProps(context) {
  let events;
  const res = await fetch("http://localhost:5000/api/events", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      events = res;
    })
    .catch((e) => console.log(`internal server error ${e}`));
  return {
    props: { events },
  };
}
