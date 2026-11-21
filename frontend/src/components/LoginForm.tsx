import { useAuth } from "../api/useAuth";

function LoginForm() {
  const auth = useAuth();

  async function login(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userName = formData.get("username") as string;
    const password = formData.get("password") as string;

    auth.login(userName, password);
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
