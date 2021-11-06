import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Events(events) {
  const [numarCoduriDeIntrodus, setNumarCoduriDeIntrodus] = useState(0);
  const [textVerificare, setTextVerificare] = useState("");
  const [statusVerificare, setStatusVerificare] = useState("");

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
      .then((res) => {
        if (res.status === "not") {
          setTextVerificare(
            "Cel putin un cod introdus a fost incorect. Incearca din nou te rog."
          );
          setStatusVerificare("danger");
        } else {
          setTextVerificare("Codurile au fost verificate cu succes.");
          setStatusVerificare("success");
        }
      });
  };

  const updateEvent = (eventName) => async (e) => {
    e.preventDefault();
    let body = {
      name: eventName,
      amount: e.target.amountNou.value,
    };
    console.log(body);
    const res = await fetch("http://localhost:5000/api/update", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => window.location.reload(false));
  };

  const templateText = (eventInfo) => {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <b>Nume:</b> {eventInfo[0]}
        </li>
        <li className="list-group-item">
          <b>Locatie:</b> {eventInfo[1]}
        </li>
        <li className="list-group-item">
          <b>Data inceput:</b> {eventInfo[2]}
        </li>
        <li className="list-group-item">
          <b>Ora inceput:</b> {eventInfo[3]}
        </li>
        <li className="list-group-item">
          <b>Data sfarsit:</b> {eventInfo[4]}
        </li>
        <li className="list-group-item">
          <b>Ora sfarsit:</b> {eventInfo[5]}
        </li>
        <li className="list-group-item">
          <b>Puiteti de plantat:</b> {eventInfo[6].length}
        </li>
        <li className="list-group-item">
          <b>Locatie ridicare puieti:</b> {eventInfo[7]}
        </li>
        <li className="list-group-item">
          <b>Puieti nerevendicati:</b> {eventInfo[8]}
        </li>
      </ul>
    );
  };

  const evenimenteViitoare = events.events.map((event, index) => {
    if (!eEvenimentTrecut(event[index + 1][2]))
      return (
        <li key={index} className="list-group-item">
          <ul className="list-group list-group-horizontal stretchy">
            <li className="list-group-item expandos">
              {templateText(event[index + 1])}
            </li>
            <li className="list-group-item no-stretchy">
              <button
                type="button"
                data-bs-toggle="modal"
                className="btn btn-success"
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
                      <h5
                        className="modal-title"
                        id={`exampleModalLabel${index}`}
                      >
                        {event[index + 1][0]}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={updateEvent(event[index + 1][0])}>
                        <label htmlFor="amountNou">
                          Vreau sa plantez atati puieti
                        </label>
                        <input type="text" name="amountNou"></input>
                        <button type="submit" className="btn btn-success">
                          Trimite
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      );
  });

  const evenimenteTrecute = events.events.map((event, index) => {
    let tempArr = [];
    for (let i = 0; i < numarCoduriDeIntrodus; i++) tempArr[i] = i;

    const inputElementsCoduri = tempArr.map((cod, i) => {
      return (
        <li key={`labelcod${i + 1}`} className="list-group-item">
          <label htmlFor={`cod${i + 1}`} className="codulet">
            Cod {i + 1}
          </label>
          <input type="text" name={`cod${i + 1}`} id={`cod${i + 1}`}></input>
        </li>
      );
    });
    if (eEvenimentTrecut(event[index + 1][2]))
      return (
        <li key={index} className="list-group-item">
          <ul className="list-group list-group-horizontal stretchy">
            <li className="list-group-item expandos">
              {templateText(event[index + 1])}
            </li>
            <li className="list-group-item no-stretchy">
              <button
                type="button"
                data-bs-toggle="modal"
                className="btn btn-success"
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
                      <h5
                        className="modal-title"
                        id={`exampleModalLabel${index}`}
                      >
                        {event[index + 1][0]}
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
                        <ul className="list-group">{inputElementsCoduri}</ul>
                        <button type="submit" className="btn btn-success">
                          Verifica codurile
                        </button>
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
          </ul>
        </li>
      );
  });

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <Image
            src="/icon.png"
            width={30}
            height={30}
            className="d-inline-block align-top"
            alt=""
          />
          Meet Trees
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Lista evenimente
              </a>
            </li>
            <li className="nav-item">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a className="nav-link" href="/creeazaEveniment">
                Creeaza un eveniment
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <h1>Lista evenimente viitoare</h1>
      <ul className="list-group">{evenimenteViitoare}</ul>
      <h1>Lista evenimente curente si trecute</h1>
      {statusVerificare && (
        <div className={`alert alert-${statusVerificare}`}>
          {textVerificare}
        </div>
      )}
      <ul className="list-group">{evenimenteTrecute}</ul>
    </div>
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
