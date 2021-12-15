import React, { useRef, useState } from 'react';
import Header from '../components/header/header';
import Lolly from '../components/lolly';
import {useQuery, useMutation} from '@apollo/client';
import { TextField, Button, Container } from '@material-ui/core';
import gql from 'graphql-tag'
import { navigate } from 'gatsby';



const ADD_LOLLY = gql `
    mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!, $flavourBottom: String!){
        createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle, flavourBottom: $flavourBottom){
            recipientName
            message
            senderName
            flavourTop
            flavourMiddle
            flavourBottom
            lollyPath
        }
    }
`;

function createNew() {

    const [color1, setColer1] = useState('#d52358');
    const [color2, setColer2] = useState('#e95946');
    const [color3, setColer3] = useState('#deaa43');

    const [recipientName, setRecipientName] = useState('')
    const [message, setMessage] = useState('')
    const [sender, setSender] = useState('')

    const [addlolly] = useMutation(ADD_LOLLY)



    const submitLollyForm = async () => {
        
        const result =   await addlolly({
            variables: {
                recipientName: recipientName,
                message: message,
                senderName: sender,
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3,
            },
            
        });
        
        navigate(`/showLolly?id=${result.data.createLolly.lollyPath}`)

    }

    return (
        <div className='container' >
            <Header />
            <div className='create_lolly_div' >

                <div className='lolly_input_div' >
                    <div className='lolly' >
                        <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />
                    </div>

                    <div className='input_div' >

                        <label htmlFor="flavourTop" className='colorPickerLabel' >
                            <input type='color' value={color1} className='colorPicker' name='flavourTop' id='flavourTop'
                                onChange={(e) => setColer1(e.target.value)}
                            />
                        </label>

                        <label htmlFor="flavourTop" className='colorPickerLabel' >
                            <input type='color' value={color2} className='colorPicker' name='flavourTop' id='flavourTop'
                                onChange={(e) => setColer2(e.target.value)}
                            />
                        </label>

                        <label htmlFor="flavourTop" className='colorPickerLabel' >
                            <input type='color' value={color3} className='colorPicker' name='flavourTop' id='flavourTop'
                                onChange={(e) => setColer3(e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                <div className='message_input_div' >
                    <label htmlFor="to_input" className='to_input' >
                        To
                    </label>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="A lolly for"
                        type="text"
                        name='to_input'
                        className='to_input'
                        id='input'
                        required
                       onChange={(e)=> {
                        setRecipientName(e.target.value)
                       }}
                    />

                    <label htmlFor="to_message" className='to_message' >
                        Say something nice
                    </label>
                    <TextField multiline rows={7} name="to_message" id='textarea' className='to_message' label='Message' variant='outlined' onChange={(e)=> {
                        setMessage(e.target.value)
                       }}  />

                    <label htmlFor="to_from" className='to_from' >
                        From
                    </label>
                    <TextField
                        variant="outlined"
                        color="primary"
                        label="from your friend"
                        type="text"
                        name='to_from'
                        className='to_from'
                        id='input'
                        
                        onChange={(e)=> {
                            setSender(e.target.value)
                           }}
                    />

                    <div className='send_lolly_btn_div2'>
                        <button onClick={ submitLollyForm}   type='button' className='send_lolly_btn2'  >Freeze this lolly and get this link</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default createNew
