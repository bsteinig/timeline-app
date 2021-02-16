import React from 'react'
import {v4 as uuid} from 'uuid'
import { Formik, Form as Formk ,Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
//import "react-datepicker/dist/react-datepicker.css";

// Formik  Props
const initialValues = {
    headline: '',
    text: '',
    media: '',
    mediaCredit: '',
    mediaCaption: '',
}

const validationSchema = yup.object({
    headline: yup.string().required('Required'),
    text: yup.string(),
    media: yup.string().url("Must be a link to youtube, vimeo, instagram, twitter status, wikipedia, or an image"),
    mediaCaption: yup.string(),
    mediaCredit: yup.string(),
})

// Datepicker 

const Form = ({event, setEvent, events, setEvents}) => {

    const onSubmit = (values) => {
        console.log('Form data', values)
        setEvents([...events,{ 
            title: values.headline, 
            text: values.text, 
            media: values.media, 
            mediaCredit: values.mediaCredit, 
            mediaCaption: values.mediaCaption,
            id: uuid()}]);
    } 

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Formk>
                Event Details
                <div className="form-control">
                    <label htmlFor="headline">Headline</label>
                    <Field type='text' id='headline' name='headline' />
                    <ErrorMessage name='headline'/>
                </div>

                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <Field as='textarea' type='text' id='text' name='text' />
                    <ErrorMessage name='text'/>
                </div>

                <div className="form-control">
                    <label htmlFor="media link">Media Link:</label>
                    <Field type='text' id='media' name='media' />
                    <ErrorMessage name='media'/>
                </div>

                <div className="form-control">
                    <label htmlFor="media credit">Media Credit:</label>
                    <Field type='text' id='mediaCredit' name='mediaCredit' />
                    <ErrorMessage name='mediaCredit'/>
                </div>

                <div className="form-control">
                    <label htmlFor="media caption">Media Caption:</label>
                    <Field type='text' id='mediaCaption' name='mediaCaption' />
                    <ErrorMessage name='mediaCaption'/>
                </div> 
                

                <button className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
            </Formk>
        </Formik>
        
    );   
}


export default Form