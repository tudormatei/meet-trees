import { useState } from "react";

export default function Events(events) {
  const [numarCoduriDeIntrodus, setNumarCoduriDeIntrodus] = useState(0);

  const onChangeNumarCoduriDeIntrodus = (e) => {
    const nr = e.target.value;
    setNumarCoduriDeIntrodus(nr);
  };

  const eEvenimentTrecut = (eveniment) => {
    let today = new Date();
    let eventDate = eveniment;
    let eventDateObject = new Date(
      eventDate.split("-")[0],
      eventDate.split("-")[1] - 1,
      eventDate.split("-")[2]
    );
    return today > eventDateObject ? true : false;
  };

  const verificaCoduri = (eventName) => async (e) => {
    e.preventDefault();
    let body = {
      name: eventName,
      codes: [],
    };
    for (let i = 0; i < numarCoduriDeIntrodus; i++) {
      body.codes[i] = e.target[i].value;
    }
    const res = await fetch("http://localhost:5000/api/verify", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const templateText = (eventInfo) => {
    return (
      <>
        Nume eveniment: {eventInfo[0]} cu locatie: {eventInfo[1]} la data de:{" "}
        {eventInfo[2]} ora: {eventInfo[3]}, si se sfarseste la data de:{" "}
        {eventInfo[4]} ora {eventInfo[5]}. Se vor planta: {eventInfo[6].length}{" "}
        puieti. Puietii vor fi ridicati de la: {eventInfo[7]}
      </>
    );
  };

  const evenimenteViitoare = events.events.map((event, index) => {
    if (!eEvenimentTrecut(event[index + 1][2]))
      return (
        <li key={index}>
          {templateText(event[index + 1])}
          <button
            type="button"
            data-bs-toggle="modal"
            className="btn btn-primary"
            data-bs-target={`#exampleModal${index}`}
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
              </div>
            </div>
          </div>
        </li>
      );
  });

  const evenimenteTrecute = events.events.map((event, index) => {
    let tempArr = [];
    for (let i = 0; i < numarCoduriDeIntrodus; i++) tempArr[i] = i;

    const inputElementsCoduri = tempArr.map((cod, i) => {
      return (
        <li key={`labelcod${i + 1}`}>
          <label htmlFor={`cod${i + 1}`}>Cod {i + 1}</label>
          <input type="text" name={`cod${i + 1}`} id={`cod${i + 1}`}></input>
        </li>
      );
    });
    if (eEvenimentTrecut(event[index + 1][2]))
      return (
        <li key={index}>
          {templateText(event[index + 1])}
          <button
            type="button"
            data-bs-toggle="modal"
            className="btn btn-primary"
            data-bs-target={`#exampleModal${index}`}
          >
            Verifica coduri
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
                <div className="modal-body">
                  <form onSubmit={verificaCoduri(event[index + 1][0])}>
                    {inputElementsCoduri}
                    <input type="submit" value="Verifica codurile boss"></input>
                  </form>
                  <label htmlFor="numarCoduriDeIntrodus">
                    Numar de coduri pe care le vreau sa le introduc
                  </label>
                  <input
                    name={`exampleModalLabel${index}`}
                    onChange={onChangeNumarCoduriDeIntrodus}
                    type="text"
                    value={numarCoduriDeIntrodus}
                    id="numarCoduriDeIntrodus"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
  });

  return (
    <>
      <h1>Lista evenimente viitoare</h1>
      <ul>{evenimenteViitoare}</ul>
      <h1>Lista evenimente curente si trecute</h1>
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
