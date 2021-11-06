import { useState } from "react";

export default function creeazaEveniment() {
  const [coduri, setCoduri] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const numeeveniment = e.target.numeeveniment.value;
    const locatieeveniment = e.target.locatieeveniment.value;
    const locatieridicatpuieti = e.target.locatieridicatpuieti.value;
    const datastarteveniment = e.target.datastarteveniment.value;
    const orastarteveniment = e.target.orastarteveniment.value;
    const datasfarsiteveniment = e.target.datasfarsiteveniment.value;
    const orasfarsiteveniment = e.target.orasfarsiteveniment.value;
    const numarpuietieveniment = e.target.numarpuietieveniment.value;
    const eveniment = {
      name: numeeveniment,
      location: locatieeveniment,
      locationsaplings: locatieridicatpuieti,
      datestart: datastarteveniment,
      hourstart: orastarteveniment,
      dateend: datasfarsiteveniment,
      hourend: orasfarsiteveniment,
      codenr: numarpuietieveniment,
    };
    const res = await fetch("http://localhost:5000/api/create", {
      method: "POST",
      body: JSON.stringify(eveniment),
    })
      .then((res) => res.json())
      .then((res) => {
        let tempArr = [];
        console.log(res);
        for (let i = 0; i < res.codes.length; i++) tempArr[i] = i;

        const codulete = tempArr.map((cod, i) => {
          return <li key={`cod${i + 1}`}>{res.codes[i]}</li>;
        });
        setCoduri(codulete);
      });
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="/icon.png"
            width="30"
            height="30"
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
              <a className="nav-link" href="/">
                Lista evenimente
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Creeaza un eveniment
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Nume eveniment
          </span>
          <input
            type="text"
            className="form-control"
            name="numeeveniment"
            aria-label="Nume eveniment"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">
            Locatie eveniment
          </span>
          <input
            type="text"
            className="form-control"
            name="locatieeveniment"
            aria-label="Locatie eveniment"
            aria-describedby="basic-addon2"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">
            Locatie ridicat puieti
          </span>
          <input
            type="text"
            className="form-control"
            name="locatieridicatpuieti"
            aria-label="Locatie ridicat puieti"
            aria-describedby="basic-addon3"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon4">
            Data start eveniment
          </span>
          <input
            type="date"
            className="form-control"
            name="datastarteveniment"
            aria-label="Data start eveniment"
            aria-describedby="basic-addon4"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon5">
            Ora start eveniment
          </span>
          <input
            type="time"
            className="form-control"
            name="orastarteveniment"
            aria-label="Ora start eveniment"
            aria-describedby="basic-addon5"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon6">
            Data sfarsit eveniment
          </span>
          <input
            type="date"
            className="form-control"
            name="datasfarsiteveniment"
            aria-label="Data sfarsit eveniment"
            aria-describedby="basic-addon6"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon7">
            Ora sfarsit eveniment
          </span>
          <input
            type="time"
            className="form-control"
            name="orasfarsiteveniment"
            aria-label="Ora sfarsit eveniment"
            aria-describedby="basic-addon7"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon8">
            Numar puieti eveniment
          </span>
          <input
            type="text"
            className="form-control"
            name="numarpuietieveniment"
            aria-label="Numar puieti eveniment"
            aria-describedby="basic-addon8"
          />
        </div>
        <input type="submit" className="btn btn-success"></input>
      </form>
      <ul>{coduri}</ul>
    </div>
  );
}
