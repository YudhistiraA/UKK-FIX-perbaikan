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

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
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
        let url = base_url + "/tanggapan/detail/pet"
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
                <Pdf targetRef={ref} filename="tanggapan.pdf" options={options} >
        {({ toPdf }) => <button class="btn btn-info" onClick={toPdf}>Download Pdf</button>}
      </Pdf>
                <div ref={ref}>
                    <center><h3 className="text-bold text-black mt-2">List Tanggapan</h3></center>
                    <br/>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NIK Pelapor</th>
                                <th>Laporan</th>
                                <th>Gambar</th>
                                <th>Tanggapan</th>
                                <th>ID Petugas</th>
                                <th>ID Pengaduan</th>
                                <th>Tgl Tanggapan</th>
                                <th>Nama</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.admins.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.pengaduan.nik}</td>
                                    <td>{item.pengaduan.isi_laporan}</td>
                                    <td><img src={product_image_url + "/" + item.pengaduan.image} className="img"
                                        height="150" width="150" alt="cant open"></img></td>
                                    <td>{item.tanggapan}</td>
                                    <td>{item.id_petugas}</td>
                                    <td>{item.id_pengaduan}</td>
                                     <td>{item.createdAt}</td>
                                     <td>{item.petugas.nama}</td>
                                    
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