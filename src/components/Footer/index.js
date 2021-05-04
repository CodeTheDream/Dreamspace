import React from 'react';
import DayOfWeek from '../../components/DayOfWeek';


const Footer = () => (
    <div className="footer">
        <div className="footer-content">Copyright ©{new Date().getFullYear()} Code the Dream</div>
        <DayOfWeek />
    </div>

)

export default Footer