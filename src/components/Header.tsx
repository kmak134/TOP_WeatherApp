import { useState } from 'react';
import searchIcon from '../assets/search.svg'
import MetricGroup from '../enums/MetricGroup';

interface Props {
    handleSearchQuery: (input: string) => Promise<void>,
    setMetricGroup: (input: MetricGroup) => void
}

const Header = ({handleSearchQuery, setMetricGroup}: Props) => {

    const [searchBarVal, setSearchBarVal] = useState<string>("");

    const handleSearchSubmit = () => {
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

    const setMetricGroupToMetric = () => {
        setMetricGroup(MetricGroup.metric);
    }

    const setMetricGroupToUSA = () => {
        setMetricGroup(MetricGroup.usa);
    }

    return <div id="header">
        <div className="logo">Weather App</div>
        <div className="searchbar">
            <input className="searchbar" type="text" title="Search" onChange={onSearchValChange} onKeyDown={onEnterPressed}/>
            <a href="#"><img className="searchIcon" src={searchIcon} width={25} /></a>
        </div>
        <div className="headerBtnGroup">
            <button onClick={setMetricGroupToMetric}>Celcius</button>
            <button onClick={setMetricGroupToUSA}>Fahrenheit</button>
        </div>
    </div>
}

export default Header;