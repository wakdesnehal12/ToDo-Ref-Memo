import React, { useRef, useState } from 'react'

const UseRef = () => {

    const [show, setShow] = useState<boolean>(false);
    const userName = useRef<HTMLInputElement>(null!);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = userName.current.value;
        name === "" ? alert("Please fill the data") : setShow(true);
        console.log(name);
    }
  return (
    <div>
        <form action="" onSubmit={submitForm}>
            <div>
                <label>Enter Your Name</label>
                <input type='text' ref={userName}/>
            </div>
            <button>Submit</button>
        </form>
        <p>{show ? `Your Name is ${userName.current.value} !` : ""}</p>
    </div>
  )
}

export default UseRef;