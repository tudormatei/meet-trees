export default function creeazaEveniment() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const numeeveniment = e.target.numeeveniment.value;
    const locatieeveniment = e.target.locatieeveniment.value;
    const dataeveniment = e.target.dataeveniment.value;
    const eveniment = {
      name: numeeveniment,
      location: locatieeveniment,
      date: dataeveniment,
    };
    const res = await fetch("http://localhost:5000/api/create", {
      method: "POST",
      body: JSON.stringify(eveniment),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nume-eveniment">Nume eveniment</label>
      <input type="text" name="numeeveniment" id="nume-evenimet"></input>
      <label htmlFor="locatie-eveniment">Locatie eveniment</label>
      <input type="text" name="locatieeveniment" id="locatie-eveniment"></input>
      <label htmlFor="data-eveniment">Data</label>
      <input type="date" name="dataeveniment" id="data-eveniment"></input>
      <input type="submit"></input>
    </form>
  );
}
