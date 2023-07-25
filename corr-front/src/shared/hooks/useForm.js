import { useState } from 'react';

const useForm = ({onSubmit}) => {
    console.log(onSubmit);
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
        console.log(count);
        console.log(mimetype);
        console.log(language);
        onSubmit(count, mimetype, language);
        //console.log(onSubmit);
        setState({
            count: '',
            mimetype: '',
            language: '',
        });
    };

  return { state, setState, handleChange, handleSubmit };
};

export default useForm;