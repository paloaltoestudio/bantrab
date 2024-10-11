import { Link } from "react-router-dom";


export default function Form() {

    return (
        <div className="wrapper">
            <h2>Danos tus datos</h2>
            <form action="">
                <select name="" id="">
                    <option value="cc">CC</option>
                    <option value="cc">NIT</option>
                </select>
                <input type="text" placeholder="Número"/>
            </form>
            

            <Link className="link" to="/photo">Siguiente</Link>
        </div>
    )

}