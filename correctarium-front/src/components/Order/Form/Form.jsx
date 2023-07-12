import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './Form.module.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const Form = ({ onSubmit }) => {
    const [state, setState] = useState({
        count: '',
        language: '',
        mimetype: '',
    });
    const [fileContent, setFileContent] = useState('');

const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const { count, language, mimetype } = state;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ count, language, mimetype });
    setState({
      count: '',
      language: '',
      mimetype: '',
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
                <span className={css.placeholder}>Введіть текст або </span>
                <label htmlFor="upload" className={css.labell} aria-hidden="true">
                завантажте файл
                <input
                    className={css.input}
                    name="fileContent"
                    type="file"
                    id="upload"
                    accept=".doc,.docx,.rtf,none"
                    onChange={handleChange}
                />
                </label>
            </div>
            )}
            {fileContent && (
            <div className={css.area_file}>
                <p>{fileContent}</p>
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
            <TextField
                sx={{
                width: 345,
                }}
                id="demo-helper-text-aligned-no-helper"
                label="Тип документа"
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
                label="Ваше ім'я"
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
                label="Коментар або побажання"
            />
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
                    <MenuItem value={'ua'}>Українська</MenuItem>
                    <MenuItem value={'ru'}>Російська</MenuItem>
                    <MenuItem value={'en'}>Англійська</MenuItem>
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
}

export default Form;

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};