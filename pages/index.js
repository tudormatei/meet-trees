export default function Events(events) {
  const openModal = (e) => {
    console.log(e);
  };

  const evenimenteViitoare = events.events.map((event, index) => {
    let today = new Date();
    let eventDate = event[index + 1][2];
    let eventDateObject = new Date(
      eventDate.split("-")[0],
      eventDate.split("-")[1] - 1,
      eventDate.split("-")[2]
    );
    if (today <= eventDateObject)
      return (
        <li key={index}>
          Nume eveniment: {event[index + 1][0]} cu locatie:{" "}
          {event[index + 1][1]} la data de: {event[index + 1][2]}{" "}
          <button
            type="button"
            data-bs-toggle="modal"
            className="btn btn-primary"
            data-bs-target={`#exampleModal${index}`}
            onClick={openModal}
          >
            Vreau sa particip
          </button>
          <div
            className="modal fade"
            id={`exampleModal${index}`}
            tabIndex="-1"
            aria-labelledby={`exampleModalLabel${index}`}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={`exampleModalLabel${index}`}>
                    Modal title for {event[index + 1][0]}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    if (today > eventDateObject)
      return (
        <li key={index}>
          Nume eveniment: {event[index + 1][0]} cu locatie:{" "}
          {event[index + 1][1]} la data de: {event[index + 1][2]}{" "}
          <button className="btn btn-primary">Verifica coduri</button>
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
