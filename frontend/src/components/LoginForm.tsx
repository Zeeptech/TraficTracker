function LoginForm() {
  return (
    <div className="grid w-fit">
      <h1>Login Form</h1>
      <input id="username" type="text" placeholder="Username" />
      <input id="password" type="password" placeholder="Password" />
      <button className="bg-slate-500 text-white">Login</button>
    </div>
  );
}

export default LoginForm;
