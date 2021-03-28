import React from "react"
import "./css/main.css"
import "./css/util.css"
import image from "./images/ts.png"
import { AiOutlineUnlock, AiOutlineUser } from 'react-icons/ai';
import axios from "axios"
import { base_url } from "../Config.js";

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }

    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }

        let url = base_url + "/admin/auth"
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                
                let admin = response.data.data
                let token = response.data.token
               
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                this.props.history.push("/")
                
            } else {
                this.setState({message: response.data.message})
                
            }
        })
        .catch(error => console.log(error))
    }
    
    

    render(){
        return(
            <div>
          <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login1000-pic js-tilt" data-tilt>
        <img src={image} />
				</div>
        <div >
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }

				<form class="login100-form validate-form" onSubmit={ev => this.Login(ev)}>
					<span class="login100-form-title">
						 Login Admin
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" placeholder="Username" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})}/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i  aria-hidden="true"><AiOutlineUser/></i>
						</span>
							
				
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
          
						<input class="input100" type="password" name="pass" placeholder="Password" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}
                            autoComplete="false" />
            <span class="focus-input100"></span>
						<span class="symbol-input100">
							<i  aria-hidden="true"><AiOutlineUnlock/></i>
						</span>
					
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Login
						</button>
					</div>

					<div class="text-center p-t-12">
					<a class="txt2" href="/register">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>

					
				</form>
			</div>
		</div>
	</div>
	</div>


	</div>

        
        )
    }

}
