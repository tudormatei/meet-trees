export default function Login() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    console.log(user);
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(`internal server error ${e}`));
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username"></input>
      <label htmlFor="password">Password</label>
      <input type="password" name="password"></input>
      <input type="submit"></input>
    </form>
  );
}
