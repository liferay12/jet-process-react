import React, { useEffect, useState } from 'react';
import Renderer from './FieldRenderer';
import toast from 'react-hot-toast';
import axios from "axios";
const Form = (props) => {
    const { formObject } = props;

    const [fieldArray, setFieldArray] = useState(formObject.fields);
    const [formData, setFormData] = useState([]);
    // const [fieldData, setFieldData] = useState(props.editData);
    const submit = (e) => {
        e.preventDefault();
        var form = new FormData();
        fieldArray.map((item, index) => {
            console.log('item..****.... ', item.value)
            console.log(item.name, "---", item.value)
            if (item.value != "") {
                console.info(item.value)
                form.append(item.name, item.value);

            }
        })

        // let isEdit = props.editData;
        // if (isEdit !== "" && isEdit != undefined) {

        // }
        console.warn(form.get("nature"))
        axios.post('http://localhost:8080/api/v1/docFile', form, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response.data);
            toast.success("Your Form has been succesfully submitted");
        }).catch((err) => {
            console.error(err);
            toast.error("Opps ! Something went wrong")
        })
    }


    return (
        <div className='container Form'>
            <h3 className='text-center'>{props.formObject.title}</h3>
            <form onSubmit={(event) => { submit(event) }}>
                <Renderer fieldArray={fieldArray} fieldData={props.editData} setFieldArray={setFieldArray} />
                <div className='text-center m-3 mb-2'>
                    {console.log("$$$$$$$$$$$")}

                    {
                        formObject.actions.map((item, index) =>
                            <>

                                {
                                    item.applyto === "form" ? (<button key={`${item.id}+${index}`} type={`${item.type}`} id={item.id} className={`${item.classes}`}>{item.label}</button>) : ""
                                }

                            </>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

export default Form;