import './Home.css'
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className="space">
            <h2 className="writing">Subscription Black Hole</h2>
            <p className="writing">
                Welcome to the Subscription Black Hole! This is a place where you can view all your subscriptions in space and manage them easily.
            </p>
            <button className="button" onClick={() => navigate('/subscriptions-solar-system')}>
                Upload statement to get started
            </button>
        </div>
    )
}


export default Menu