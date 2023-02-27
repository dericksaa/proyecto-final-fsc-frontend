import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { RiRotateLockFill } from "react-icons/ri";
import Modal from "react-modal";
import axios from 'axios'

Modal.setAppElement("#__next");

export default function SendRecovery({ isOpen, onRequestClose }) {
    const style = {

        overlay: {
            backgroundColor: "rgba(0,0,0,.7)"
        },

        content: {
            width: "50vw",
            inset: 0,
            margin: "auto",
            height: "min-content",
            padding: "0 30px 50px",
            backgroundColor: "#d9d9d9"
        }
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:5000/api/user');
            setUsers(response.data);
        }
        fetchData();
    }, []);

    const reestablecer = async (id) => {
        const dataos = {id}
        await axios.post('http://localhost:5000/api/change',dataos)
    }

    return (
        <Modal isOpen={isOpen} style={style} onRequestClose={onRequestClose}>
            <div onClick={onRequestClose}><MdClose size={30} className="close-modal" /></div>
            <div className="modal">
                <header>
                    <h2>Restablecer Contraseña</h2>
                </header>
                <div className='table'>
                    <div>
                        <p>E-mail</p>
                        <p>Enviar LInk</p>

                    </div>
                    
                        {users.map(user => (
                            <div>
                                <span key={user._id}>{user.email}</span>
                                <button className="btn submit"
                                onClick={() => reestablecer(user._id)}
                                ><RiRotateLockFill /></button>
                            </div>
                        ))}
                </div>
            </div>
        </Modal>
    )
}
