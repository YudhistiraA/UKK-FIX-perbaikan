import React from "react"
import "./css/main.css"
import "./css/util.css"
import { AiOutlineUnlock, AiOutlineUser,AiFillMail,AiOutlinePhone,AiOutlineBorderlessTable } from 'react-icons/ai';
import image from "./images/ts.png"
import axios from "axios"
import { base_url } from "../Config.js";
export default class Home extends React.Component{
	constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            nama: "",
            nik:"",
            message: "",
            logged: true
        }

    }
    
   
    
            saveAdmin = event => {
                event.preventDefault()
                let form = {
                    nama: this.state.nama,
                    username: this.state.username,
                    nik: this.state.nik,
                    
                    password :  this.state.password
                
                }
                
                
                  
                
        
                let url = base_url + "/masyarakat"
               
                    axios.post(url,form)
                    .then(response => {
                        window.alert(response.data.message)
                        this.props.history.push("/login")
                    })
                    .catch(error => console.log(error))
                
            }
        
        
        
        

    render(){
        return(
          <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
                <img src={image} />
				</div>

                <div >
                        { !this.state.logged ? 
                        (
                            <div className="alert alert-danger mt-1">
                                { this.state.message }
                            </div>
                        ) : null }


				<form class="login100-form validate-form" onSubmit={ev => this.saveAdmin(ev)}>
					<span class="login100-form-title">
						 Register Masyarakat
					</span>


                    <div class="wrap-input100 validate-input" >
						<input class="input100" type="text" name="nama" placeholder="Nama lengkap" value={this.state.nama}
                            onChange={ev => this.setState({nama: ev.target.value})}/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i  aria-hidden="true"><AiOutlineUser/></i>
						</span>
				</div>










                    <div class="wrap-input100 validate-input" >
						<input class="input100" type="text" name="nik" placeholder="Nik" value={this.state.nik}
                            onChange={ev => this.setState({nik: ev.target.value})}/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i  aria-hidden="true"><AiOutlineBorderlessTable/></i>
						</span>
							
				
					</div>
					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" placeholder="Email" value={this.state.username}
                            onChange={ev => this.setState({username: ev.target.value})}/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i  aria-hidden="true"><AiFillMail/></i>
						</span>
							
				
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
          
						<input class="input100" type="password" name="pass" placeholder="Password" value={this.state.password}
                            onChange={ev => this.setState({password: ev.target.value})}/>
                         <span class="focus-input100"></span>
						<span class="symbol-input100">
							<i  aria-hidden="true"><AiOutlineUnlock/></i>
						</span>
					
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit">
							Register
						</button>
					</div>

					<div class="text-center p-t-12">
					<a class="txt2" href="/login">
							Login
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>

					
				</form>
			</div>
		</div>
	</div>
	</div>


	

        
        )
    }

}