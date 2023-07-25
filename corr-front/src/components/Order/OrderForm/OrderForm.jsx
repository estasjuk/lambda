import { useState } from 'react';
import PropTypes from 'prop-types';
import { memo } from 'react';

import css from './OrderForm.module.css';
//import useForm from '../../../shared/hooks/useForm';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import TextField from '@mui/material/TextField';

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
        onSubmit(count, mimetype, language); 
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
        <div className={css.area}>
            <textarea
            name="count"
            value={count}
            onChange={handleChange}
            className={css.area_text}
            ></textarea>

            {!count && (
            <div className={css.area_download}>
                <span className={css.placeholder}>Введіть кількість символів для розрахунку </span>
            </div>
            )}
        </div>

        <div className={css.data_flex}>

            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
            }}
            >
            <textarea
            name="mimetype"
            value={mimetype}
            onChange={handleChange}
            className={css.area_text}
            ></textarea>
            </Box>
            <Box
                className={css.margin_select}
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
        </div>
        </form>
    </div>
    );
};

export default memo(OrderForm);

OrderForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};