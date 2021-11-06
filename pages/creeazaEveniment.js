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
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="nume-eveniment">Nume eveniment</label>
        <input type="text" name="numeeveniment" id="nume-evenimet"></input>
        <label htmlFor="locatie-eveniment">Locatie eveniment</label>
        <input
          type="text"
          name="locatieeveniment"
          id="locatie-eveniment"
        ></input>
        <label htmlFor="locatie-ridicat-puieti">Locatie ridicat puieti</label>
        <input
          type="text"
          name="locatieridicatpuieti"
          id="locatie-ridicat-puieti"
        ></input>
        <label htmlFor="data-start-eveniment">Data start eveniment</label>
        <input
          type="date"
          name="datastarteveniment"
          id="data-start-eveniment"
        ></input>
        <label htmlFor="ora-start-eveniment">Ora start eveniment</label>
        <input
          type="time"
          name="orastarteveniment"
          id="ora-start-eveniment"
        ></input>
        <label htmlFor="data-sfarsit-eveniment">Data sfarsit eveniment</label>
        <input
          type="date"
          name="datasfarsiteveniment"
          id="data-sfarsit-eveniment"
        ></input>
        <label htmlFor="ora-sfarsit-eveniment">Ora sfarsit eveniment</label>
        <input
          type="time"
          name="orasfarsiteveniment"
          id="ora-sfarsit-eveniment"
        ></input>
        <label htmlFor="text">Numar puieti eveniment</label>
        <input
          type="text"
          name="numarpuietieveniment"
          id="numar-puieti-eveniment"
        ></input>
        <input type="submit"></input>
      </form>
      <ul>{coduri}</ul>
    </>
  );
}
