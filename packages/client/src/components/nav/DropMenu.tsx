import { Link } from "react-router-dom"
import { user } from "../../types"

import './drop-menu.css'
import { useState } from "react"

type dropMenuProps = {
    list: user[]
}

export const DropMenu = ({ list }: dropMenuProps) => {

    const [show, setShow] = useState(false)

    return (
        <div className="drop-menu-container">
            <label>
                <input type="checkbox" className="drop-menu-checkbox" checked={show}
                    onClick={(e) => setShow(e.currentTarget.checked)}
                />

                <p className="drop-menu-button">Usuários</p>
            </label>
            {
                show &&
                <div className="drop-menu-list">
                    {
                        list.length > 0 ?
                            list.map(user => <Link className="drop-menu-element" onClick={() => setShow(false)} to={`/profile/${user.userId}`}>{user.username}</Link>)
                            : <p>Nenhum Usuário cadastrado!</p>
                    }
                </div>
            }
        </div>
    )
}
