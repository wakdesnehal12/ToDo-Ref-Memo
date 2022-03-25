import React, { ChangeEvent, useEffect, useState } from 'react';
import { ProList } from './Component/Interfaces'; 
import List from './Component/List';

 // To get data from Local Storage
 const getLocalItem = (): void  => {
    let keylist = localStorage.getItem('item');
    console.log(keylist);
}

export default function Todolist() {
    const [addName, setAddName] = useState<string>("");
    const [number, setNumber] = useState<number>(0);
    const [todoList, setTodoList] = useState<ProList[]>([]);
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if(event.target.name === "addName"){
            setAddName(event.target.value);
        }else{
            setNumber(Number(event.target.value))
        }
        // setAddName(event.target.value)
    };

    const addList = (): void => {
        const newList = { names : addName, nums : number };
        // setTodoList([...todoList, newList]);

        let itemValue = 0;
        if(
            todoList.some((item, ind) => {
                itemValue = ind;
                return item.nums === number;
            })
        ) {
            todoList[itemValue] = newList;
            setTodoList([...todoList]);
        }else {
            setTodoList([...todoList, newList]);
        } 
        
        setAddName("");
        setNumber(0);
    };

    //Delete the Item
    const completeList = (namesToDelete: string): void => {
        setTodoList(
            todoList.filter((item) => {
            return item.names != namesToDelete;
            })  
        );
    };

    //Edit The Item
    const completeLists = (namesToEdit: string, numsToEdit: number): void => {
        setTodoList(
            todoList => todoList.map((item) => {
                if (item.names === namesToEdit){
                    return{
                        ...item,
                        number : numsToEdit
                    }
                    
                }
                return item;
            })
        );

        // console.log(numsToEdit);

        setAddName(namesToEdit);
        setNumber(numsToEdit);
    };
        // add Data to localStorage
        useEffect( () => {
            localStorage.setItem('key', JSON.stringify(todoList))
        }, [todoList]);

       
  return (
    <>
        <div>
            <div>
                <h3>ToDo List ( Using TypeScript)</h3>
            </div>
            <label>Product Name: </label>
            <input
                type="text"
                name='addName'
                value={addName}
                onChange={handleChange}
            />

            <label>Quantity: </label>
            <input
                type="number"
                name='number'
                value={number}
                onChange={handleChange}
            />
        </div>

        <div>
            <button onClick={addList}>ADD</button>
        </div>
        
        
        <div>
            <table className='tableData'>
                <tr>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {
                    todoList.map((item: ProList, key: number) => {
                        return (
                                <List 
                                    key={key} 
                                    item={item} 
                                    completeList={completeList}
                                    completeLists={completeLists}
                                />   
                            );                 
                        })
                }
                
                
            </table>
        </div>
       
    </>
  )
}
