import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";

export default function Register() {
    const navigate = useNavigate();
    const FormSub = async(event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formRegister));
        // console.log(email, password);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) {
                toast.error("Qualcosa è andato storto");
            } else {
                
                toast.success("Account creato con successo");
                await new Promise((resolve) => setTimeout(resolve, 1500));
                formRegister.reset();
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
                <form onSubmit={FormSub}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" name="email" class="form-control" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" />
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                    <Toaster richColors />
                </form>
                <Link to="/login" className="navbar-brand fw-bold fs-3 d-flex justify-content-end mt-5">Clicca qui per il login!</Link>
            </div>
        </>
    )
}