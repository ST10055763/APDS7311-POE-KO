import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Signup() {
    const [form, setForm] = useState({
        name:"",
        accountnumber:"",
        idnumber:"",
        password:""


    });
    const navigate = useNavigate();
    function updateForm(value){
        return setForm((prev) => {
            return {...prev,...value};
        });
    }
    async function onSubmit(e){
        e.preventDefault();

        const newPerson ={...form};

        await fetch("https://localhost:3001/user/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({name: "", accountnumber:"",idnumber:"", password:""});
        navigate("/dashboard");
    }
    return (
        <div className="container mt-5">
            <h3 className="text-center">Register</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="accountnumber">Account Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="accountnumber"
                        value={form.accountnumber}
                        onChange={(e) => updateForm({ accountnumber: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idnumber">ID Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="idnumber"
                        value={form.idnumber}
                        onChange={(e) => updateForm({ idnumber: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" // Change to 'password' type for better security
                        className="form-control"
                        id="password"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>
                <div className="form-group text-center">
                    <input
                        type="submit"
                        value="Create Person"
                        className="btn btn-primary mt-3"
                    />
                </div>
            </form>
        </div>
    );
    
}
