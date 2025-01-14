import { Link, useNavigate } from "react-router"
import supabase from "../supabase/client"
import { Toaster, toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const FormLog = async(event) => {
    event.preventDefault();
    const formLogin = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formLogin));
    // console.log(email, password);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        toast.error("Qualcosa è andato storto");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast.success("Login effettuato con successo");
        formLogin.reset();
        navigate("/");
      }
    }
    catch (error) {
      alert(error);
    }
}
  return (
    <>
      <Link to="/" className="navbar-brand fw-bold fs-3 px-5"><i className="bi bi-arrow-left"></i> Torna alla Home</Link>
      <div className="container mt-5">
        <form onSubmit={FormLog}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Toaster richColors />
        </form>
      </div>
    </>
  )
}