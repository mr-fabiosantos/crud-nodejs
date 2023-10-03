import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #FFF;
    padding: 20px;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    with: 120px;
    padding: 0 10px;
    border: 1px solid #BBB;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: nome;
    background-color: #2C73D2;
    color: #FFF;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.name.value = onEdit.name;
            user.email.value = onEdit.email;
            user.phone.value = onEdit.phone;
            user.date_birth.value = onEdit.date_birth;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.name.value ||
            !user.email.value ||
            !user.phone.value ||
            !user.date_birth.value
        ) {
            return toast.warn("Fill in all fields.");
        }

        if (onEdit) {
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                name: user.name.value,
                email: user.email.value,
                phone: user.phone.value,
                date_birth: user.date_birth.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios
            .post("http://localhost:8800", {
                name: user.name.value,
                email: user.email.value,
                phone: user.phone.value,
                date_birth: user.date_birth.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data}) => toast.error(data));
        }

        user.name.value = "";
        user.email.value = "";
        user.phone.value = "";
        user.date_birth.value = "";

        setOnEdit(null);
        getUsers();
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <label>Name</label>
                <Input name="name" />
            </InputArea>
            <InputArea>
                <label>Email</label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <label>Phone</label>
                <Input name="phone" />
            </InputArea>
            <InputArea>
                <label>Date of Birth</label>
                <Input name="date_birth" type="date" />
            </InputArea>

            <Button type="submit">SAVE</Button>
        </FormContainer>
    );
};

export default Form;