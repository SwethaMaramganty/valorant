import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import randomString from "random-string";
import useMutation from "apollo-client";
import {ProgressBar} from "react-bootstrap"
import {Card, CardContent, Typography, makeStyles} from '@material-ui/core';

//Trying to retrieve and add data from patient record db and displaying it in UI
const client  = new ApolloClient({
    uri: 'http://142.1.46.70:8081/graphql'
  })

const options = [
    'Male', 'Female', 'Other', 'Kunal'
  ];
const defaultOption = options[0];

const ADDING_PATIENT = gql`
mutation addUserInfo($userid: Int, $addressid: Int,$username: String, $first_name: String, $last_name: String,
    $phone_number: String, $email: String, $birthdate: String, $date_became_patient: String,
    $gender: String) {
        addUserInfo(userid: $userid, addressid: $addressid, username: $username, first_name: $first_name, last_name: $last_name,
            phone_number: $phone_number, email: $email, birthdate: $birthdate, 
            date_became_patient: $date_became_patient, gender: $gender) {
                addressid
                userid
        }

}`;
  
class RegisterPage extends React.Component{

    state = {
        userid: 5,
        addressid: 2,
        userName:'',
        firstName: '',
        lastName:'',
        email:'',
        gender:'Male',
        phoneNumber: '',
        dateRegistered: '',
        birthdate: '',
        streetName: '',
        city:'',
        postal_code: '',
        province: '',
        country:'',
        otherdetails: ''
    }

    // username: ${this.state.userName} first_name:${this.state.firstName} last_name:${this.state.last_name}
    //             phone_number:${this.state.phone_number} email:${this.state.email} birthdate:${this.state.birthdate} 
    //             date_became_patient: ${this.state.date_became_patient} gender:${this.state.gender})
    // {${this.userid}
    //  ${this.addressid}

    phoneNumber = (event) => {
        this.setState({ 
            phoneNumber: event.target.value
        })
    }

    firstName = (event) => {
        this.setState({ 
            firstName: event.target.value
        })
    }

    lastName = (event) => {
        this.setState({ 
            lastName: event.target.value
        })
    }

    email = (event) => {
        this.setState({ 
            email: event.target.value
        })
    }

    gender = (event) => {
        this.setState({ 
            gender: event.value
        })
    }

    userName = (event) => {
        this.setState({ 
            userName: event.target.value
        })

    }

    dateRegistered = (event) => {
        this.setState({ 
            dateRegistered: event
        })
    }

    birthdate = (event) => {
        this.setState({ 
            birthdate: event
        })
    }

    streetName = (event) => {
        this.setState({ 
            streetName: event.target.value
        })
    }

    city = (event) => {
        this.setState({ 
            city: event.target.value
        })
    }

    postalCode = (event) => {
        this.setState({ 
            postalCode: event.target.value
        })
    }

    country = (event) => {
        this.setState({ 
            country: event.target.value
        })
    }

    province = (event) => {
        this.setState({ 
            province: event.target.value
        })
    }

    otherDetails = (event) => {
        this.setState({ 
            otherDetails: event.target.value
        })
    }

    addUser = () => {
        // var addressid = randomString({
        //     length: 3,
        //     numeric: true,
        //     letters: false,
        //     special: false});
        // var userid = randomString({
        //     length: 3,
        //     numeric: true,
        //     letters: false,
        //     special: false}); 
            
                
        console.log(this.state.userName)
        console.log(this.state.firstName)
        console.log(this.state.lastName)
        console.log(this.state.phoneNumber)
        console.log(this.state.gender)
        console.log(this.state.dateRegistered)
        console.log(this.state.birthdate)
        console.log(this.state.email)
        console.log(this.state.streetName)
        console.log(this.state.city)
        console.log(this.state.postalCode)
        console.log(this.state.country)
        console.log(this.state.province)
        console.log(this.state.otherDetails)
        
        return(
            
            <ApolloProvider client={client}>
            <Mutation mutation={this.ADDING_PATIENT}>
                {(addUserInfo, data) => (
                    addUserInfo({variables:
                        {
                        userid: 33,
                        addressid: 1,
                        username: this.state.userName,
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        phone_number: this.state.phoneNumber,
                        email: this.state.email,
                        birthdate: this.state.birthdate,
                        date_became_patient: this.state.date_became_patient,
                        gender: this.state.gender
                    } 
                })
                )}
            </Mutation>
        </ApolloProvider> 
        )    
    }

    render(){
        return (
            <Fragment>
                
                <Card variant="outlined" style={{display: 'inline-block', height: "25%", left: "25%"
                ,position: "absolute", width: "50%", top: "25%"}}>
                <CardContent>
                    <Typography style={{position: "relative", left: "50%"}} gutterBottom>Register</Typography>
                    <ProgressBar animated now={50} label={`${50}%`}/>
                    </CardContent>
                </Card> 

                
                <div>First Name: 
                    <input id="firstName" type="text" onChange={this.firstName} ></input>
                </div> 

                <div>Last Name: 
                    <input id="lastName" type="text" onChange={this.lastName} ></input>
                </div> 
                
                <div>Phone Number: 
                    <input id="phoneNumber" type="text" onChange={this.phoneNumber} ></input>
                </div> 

                <div>Email: 
                    <input id="email" type="text" onChange={this.email} ></input>
                </div> 

                <div>Gender: 
                    <Dropdown options={options} onChange={this.gender} value={defaultOption} placeholder="Select Gender:" />
                </div>

                <div>User name: 
                    <input id="userName" type="text" onChange={this.userName}></input>
                </div>

                <div>Date Registered:
                    <DatePicker selected={this.state.dateRegistered} onChange={(event) => this.dateRegistered(event)}/>
                </div>

                <div>Birthdate:
                    <DatePicker selected={this.state.birthdate} onChange={(event) => this.birthdate(event)}/>
                </div>

                <div>Streetname: 
                    <input id="streetName" type="text" onChange={this.streetName} ></input>
                </div>

                <div>City: 
                    <input id="city" type="text" onChange={this.city} ></input>
                </div>

                <div>Postal Code: 
                    <input id="postalCode" type="text" onChange={this.postalCode} ></input>
                </div>

                <div>Province: 
                    <input id="province" type="text" onChange={this.province} ></input>
                </div>

                <div>Country: 
                    <input id="country" type="text" onChange={this.country} ></input>
                </div>

                <div>Other Details: 
                    <input id="otherDetails" type="text" onChange={this.otherDetails} ></input>
                </div>
           
                <input type="submit" value="Submit" onClick={this.addUser}></input>
                <ApolloProvider client={client} useMutation={ADDING_PATIENT}>
                    <Mutation mutation={ADDING_PATIENT}>
                        
                        {(adding_patient, { data }) => (
                            <button onClick={(e) => {
                                e.preventDefault();
                                adding_patient({
                                    variables: {
                                        userid: this.state.userid, addressid: this.state.addressid,
                                        username: this.state.userName, first_name: this.state.firstName,
                                        last_name: this.state.lastName, phone_number: this.state.phoneNumber,
                                        email: this.state.email, birthdate: this.state.birthdate,
                                        date_became_patient: this.state.dateRegistered,
                                        gender: this.state.gender
                                    }
                                })
                                console.log(this.state.phoneNumber)
                                console.log(typeof(this.state.phone))
                            }}>
                                Submit 
                            </button>
                        )}
                    </Mutation>
                </ApolloProvider>
            </Fragment>
        )
    }
}
export default RegisterPage;