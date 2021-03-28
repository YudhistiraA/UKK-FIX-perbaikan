import React from "react"
import { base_url, product_image_url } from "../Config.js";
import axios from "axios"
import Pdf from "react-to-pdf";
const ref = React.createRef();
const options = {
    orientation: 'landscape',
    
};

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            admins: [],
            coba: [],
            action: "",
            nik: "",
            status: 0,
            image: "",
            uploadFile: true,
            id_petugas: "",
            tangggapan:"",
            id_pengaduan:0,
            pelapor:"",
            isi_laporan:""
        }
        this.handleChange = this.handleChange.bind(this);
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        
    }

    handleChange(event) {
        this.setState({status: event.target.value});
      }
    

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
   
    
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        this.setState({adminName: admin.name})
        this.setState({id_petugas: admin.id_petugas})
    }

    getPengaduan = () => {
        let url = base_url + "/product"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({admins: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
   
  
   
    componentDidMount(){
        this.getPengaduan()
         this.getAdmin()
    }
   

    render(){
        return (
            <div>
               
              
                <div className="container">
                <br/>
                <br/>
                <Pdf targetRef={ref} filename="pengaduan.pdf" options={options} >
        {({ toPdf }) => <button class="btn btn-info" onClick={toPdf}>Download Pdf</button>}
      </Pdf>
                <div ref={ref}>
                   <center><h3 className="text-bold text-black mt-2">List laporan</h3></center> 
                    <br/>
     
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nik pelapor</th>
                                <th>pelapor</th>
                                <th>laporan</th>
                                <th>gambar</th>
                                
                                <th>tanggal laporan</th>
                                <th>status</th>
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.admins.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nik}</td>
                                    <td>{item.pelapor}</td>
                                    <td>{item.isi_laporan}</td>
                                    <td><img src={product_image_url + "/" + item.image} className="img"
                                        height="150" width="150" alt="cant open"></img></td>
                                        
                                    <td>{item.createdAt}</td>
                                    <td>{item.status}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
       
                    
                
                     
            </div>
              </div>
        )
    }

}