import {link} from 'react-router-dom'

const NavigattionBar = () => {
    return(
        <>
            <nav>
                <ul>
                    <li Link to='/'>Home</li>
                    <li Link to='/calendar'>Calendar</li>
                    <li Link to='/chat'>Chat</li>
                </ul>
            </nav>
        </>
    )
};

export default NavigattionBar;