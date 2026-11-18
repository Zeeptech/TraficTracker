function LoginForm() {
  async function login(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userName = formData.get("username");
    const password = formData.get("password");
    console.log(userName, password);

    const url = "http://localhost:3000/auth";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password: password }),
      });
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.token);

      const token = result.token;
      document.cookie = `token=${token}; path=/;`;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="grid w-fit p-4">
      <h1>Login</h1>
      <div>
        <form onSubmit={login}>
          <input name="username" type="text" placeholder="Username" />
          <br />
          <input name="password" type="password" placeholder="Password" />
          <br />
          <input
            type="submit"
            value="Login"
            className="bg-slate-500 text-white"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
