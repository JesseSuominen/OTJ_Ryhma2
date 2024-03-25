import { Link } from 'react-router-dom'

const NavigattionBar = () => {
    return(
        <>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/calendar'>Calendar</Link></li>
                    <li><Link to='/chat'>Chat</Link></li>
                </ul>
            </nav>
        </>
    )
};

export default NavigattionBar;