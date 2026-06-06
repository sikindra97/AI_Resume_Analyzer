import { useState } from "react";

import {
Link,
useNavigate
}
from "react-router-dom";

import API from "../api/axios";

function Register() {

const navigate =
useNavigate();

const [formData,setFormData]
=
useState({

name:"",

email:"",

password:""

});

const handleChange =
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});
};

const handleSubmit =
async (e)=>{

e.preventDefault();

try{

await API.post(

"/auth/register",

formData

);

alert(
"Registration Successful"
);

navigate("/");

}
catch(error){

alert(
error.response?.data?.message
);

}
};

return(

<div
className="
min-h-screen
flex
justify-center
items-center
bg-gray-100
"
>

<form

onSubmit={
handleSubmit
}

className="
bg-white
p-8
rounded-xl
shadow-md
w-[400px]
"
>

<h1
className="
text-3xl
font-bold
text-center
mb-6
"
>
Register
</h1>

<input

type="text"

name="name"

placeholder="Name"

value={formData.name}

onChange={handleChange}

className="
w-full
border
p-3
mb-4
rounded
"
/>

<input

type="email"

name="email"

placeholder="Email"

value={formData.email}

onChange={handleChange}

className="
w-full
border
p-3
mb-4
rounded
"
/>

<input

type="password"

name="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

className="
w-full
border
p-3
mb-4
rounded
"
/>

<button

className="
w-full
bg-green-600
text-white
p-3
rounded
"
>

Register

</button>

<p
className="
text-center
mt-4
"
>

Already have account?

<Link
to="/"
className="
text-blue-600
ml-2
"
>

Login

</Link>

</p>

</form>

</div>

);
}

export default Register;