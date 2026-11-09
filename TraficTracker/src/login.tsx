export default function Login() {
    return (
<form action="login" id="loginForm" method="post">
        User Name: <input type="text" name="usr.name" />
        Password: <input type="password" name="usr.pwd" />
        <input type="submit" value="Login" />
      </form>
    )
}