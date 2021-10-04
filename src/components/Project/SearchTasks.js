import React, {useState} from 'react'
import './SearchTask.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    searchControl: {
        position: 'relative !important',
        width: 'auto !important',
        borderRadius: '8px !important',
        left: '50% !important',
        background: 'lightblue !important'
    }}));

const SearchTask = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    return (
        <input className={classes.searchControl}
               id="input-search-header" value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder="Search" type="Search"
               aria-describedby="search-helper-text"
        />
    )
}

export default SearchTask
