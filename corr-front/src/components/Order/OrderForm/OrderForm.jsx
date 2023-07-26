import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './OrderForm.module.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const OrderForm = ({ onSubmit }) => {

    const [state, setState] = useState({
        count: '',
        mimetype: '',
        language: '',
    })

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const { count, mimetype, language } = state;

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({count, mimetype, language}); 
        setState({
            count: '',
            mimetype: '',
            language: '',
        });
    };

    return (
    <div>
    <h2 className={css.main_title}>Замовити редагування</h2>
        <form onSubmit={handleSubmit} className={css.main_form}>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
            }}
            >
            <TextField
                sx={{
                width: 345,
            }}
                id="demo-helper-text-aligned-no-helper"
                name="count"
                value={count}
                label="Кількість символів для розрахунку"
                onChange={handleChange}
                required
            />
        </Box>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
            }}
        >
            <TextField
                sx={{
                width: 345,
                }}
                id="demo-helper-text-aligned-no-helper"
                label="Тип документу"
                name="mimetype"
                value={mimetype}
                onChange={handleChange}
                required
            />
        </Box>
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
        }}
        >
            <FormControl sx={{ width: 345 }} fullWidth>
            <InputLabel id="demo-simple-select-label">
                Мова
            </InputLabel>
            <Select
                    name="language"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="language"
                    onChange={handleChange}
                    required
                >
                    <MenuItem value={'ua'}>ua</MenuItem>
                    <MenuItem value={'ru'}>ru</MenuItem>
                    <MenuItem value={'en'}>en</MenuItem>
            </Select>
            </FormControl>
        </Box>
        <button className={css.btn} type="submit">
            Розрахувати час та ціну
        </button>
        </form>
        </div>
    );
};

export default OrderForm;

OrderForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};