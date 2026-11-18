function LoginForm() {
  return (
    <div className="grid w-fit p-4">
      <h1>Login Form</h1>
      <div>
        <form>
          <input id="username" type="text" placeholder="Username" />
          <br />
          <input id="password" type="password" placeholder="Password" />
          <br />
          <button className="bg-slate-500 text-white">Login</button>
        </form>
       </div>
    </div>
  );
}

export default LoginForm;
