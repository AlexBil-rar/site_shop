import React, { useState } from 'react';
import { Form } from 'bootstrap-4-react';

const SearchBox = ({ history }) => {
    const [keyword, setKeywordd] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    }; 

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Input 
                type="text" 
                name="q" 
                placeholder="Поиск ..."
                onChange={(e) => setKeywordd(e.target.value)}
            ></Form.Input>
        </Form>
    );
};

export default SearchBox;
