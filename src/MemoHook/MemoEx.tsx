import React, { useMemo, useState } from 'react'

export default function MemoEx() {
    const [numOne, setNumOne] = useState<number>(0);
    const [numTwo, setNumTwo] = useState<number>(0);

    const countOne = () => {
        setNumOne(numOne + 1);
    }

    const countTwo = () => {
        setNumTwo(numTwo + 1);
    }

    const isEven = useMemo(() => {
        let i = 0;
        while (i < 2000000000) i++;
        return numOne % 2 === 0;
    }, [numOne])

    // const isEven = () => {
    //     let i = 0;
    //     while (i < 2000000000) i++;
    //     return numOne % 2 === 0;
    // }
    // console.log(isEven);

  return (
    <div>
        <div>
            <label>Counter One</label>
            <input type='number' value={numOne} />
            <button onClick={countOne}>ADD</button>
            <button style={{margin: '0 10px'}}>{isEven ? 'Even' : 'odd'}</button>
        </div>

        <div>
            <label>Counter Two</label>
            <input type='number' value={numTwo}/>
            <button onClick={countTwo}>ADD</button>
        </div>
    </div>
  )
}
