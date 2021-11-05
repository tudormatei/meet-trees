export default function Events(events) {
  const listItems = events.events.map((event, index) => {
    return (
      <li key={index}>
        Nume eveniment: {event[index + 1][0]} cu locatie: {event[index + 1][1]}{" "}
        la data de: {event[index + 1][2]}
      </li>
    );
  });
  return (
    <>
      <h1>Lista evenimente</h1>
      <ul>{listItems}</ul>
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
