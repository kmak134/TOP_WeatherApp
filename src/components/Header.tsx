import { useState } from 'react';
import searchIcon from '../assets/search.svg'

interface Props {
    handleSearchQuery: (input: string) => Promise<void>
}

const Header = ({handleSearchQuery}: Props) => {

    const [searchBarVal, setSearchBarVal] = useState<string>("");

    const handleSearchSubmit = () => {
        console.log(searchBarVal);
        handleSearchQuery(searchBarVal);
    }

    const onSearchValChange = (e: any) => {
        setSearchBarVal(e.target.value);
    }

    const onEnterPressed = (e: any) => {
        if (e.key == "Enter") {
            handleSearchSubmit();
            e.preventDefault();
        }
    }

    return <div id="header">
        <div className="logo">Weather App</div>
        <div className="searchbar">
            <input className="searchbar" type="text" title="Search" onChange={onSearchValChange} onKeyDown={onEnterPressed}/>
            <a href="#"><img className="searchIcon" src={searchIcon} width={25} /></a>
        </div>
        <div className="headerBtnGroup">
            <button>Celcius</button>
            <button>Fahrenheit</button>
        </div>
    </div>
}

export default Header;