import React, { useState, useRef } from 'react'
import './Dropdown.css'; 
import { ReactComponent as DropdownIcon } from '../assets/light-mode/triangle.svg'; 

function Dropdown({ list }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    const buttonRef = useRef(null); 

    const handleItemClick = (item) => {
        setSelectedItem(item); 
        setIsOpen(false); 
    };

    
    const setMenuWidth = () => {
        if (buttonRef.current) {
            const buttonWidth = buttonRef.current.getBoundingClientRect().width;
            return { width: `${buttonWidth}px` };
        }
        return {};
    };
    
const setButtonWidth = () => {
    if (buttonRef.current && list.length > 0) {
        const maxWidthItem = list.reduce((maxWidth, item) => {
            const itemWidth = item.length * 8; 
            return itemWidth > maxWidth ? itemWidth : maxWidth;
        }, 0);
        return { width: `${maxWidthItem}px` };
    }
    return {};
};


    return (
        <div className="relative inline-block text-left">
           <button
    ref={buttonRef}
    onClick={() => setIsOpen(!isOpen)}
    className="dropdown-button"
    style={{ ...setButtonWidth(), backgroundColor: isOpen ? '#E2DCC8' : 'inherit' }}
>
    {selectedItem || 'Urgency Level'}
    <DropdownIcon className="dropdown-icon" />
</button>

            {isOpen && (
                <div className="dropdown-menu" style={setMenuWidth()}>
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleItemClick(item)}
                            style={{ backgroundColor: selectedItem === item ? '#F2F1F1' : 'transparent' }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;


