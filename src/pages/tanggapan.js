import React from "react"
import Navbar from "../components/Navbar"
import { base_url, product_image_url } from "../Config.js";
import $ from "jquery"
import axios from "axios"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
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
        let url = base_url + "/tanggapan/detail"
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
    drop = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/tanggapan/" + selectedItem.id_tanggapan
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        }
    }


    Edit = selectedItem => {
        $("#modal_admin").modal("show")
        this.setState({
            action: "update",
            tanggapan:selectedItem.tanggapan,
            id_tanggapan: selectedItem.id_tanggapan
        })
    }
    saveA = event => {
        event.preventDefault()
        $("#modal_admin").modal("hide")
        let form = {
            tanggapan: this.state.tanggapan,
            id_tanggapan: this.state.id_tanggapan,
        }
        
       
        let url = base_url + "/tanggapan"
        if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        }
    }


    render(){
        return (
            <div>
                <Navbar />
                <br/>
                <br/>
                <br/>
                <div className="container">
                    <center><h3 className="text-bold text-black mt-2">List Tanggapan</h3></center>
                    <br/>
                    <div> <button className="btn btn-danger "><a href="/printt" className="text-white"> Generate PDF</a></button></div>
                    <br/>
                    <table className="table  table-striped">
                    <thead class="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Nik Pelapor</th>
                                <th>Isi Laporan</th>
                                <th>Gambar</th>
                                <th>Tanggapan</th>
                                <th>ID Petugas</th>
                                <th>ID Pengaduan</th>
                                <th>Tgl Tanggapan</th>
                                <th>Aksi</th>
                                
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
                                    
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                       onClick={() => this.drop(item)}>
                                            Hapus
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br/>
                    <br/>
                    <br/>
                    </div>
                    
                  {/* modal admin  */}
                  <div className="modal fade" id="modal_admin">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Admin</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveA(ev)}>
                                       tanggapan
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.tanggapan}
                                        onChange={ev => this.setState({tanggapan: ev.target.value})}
                                        required
                                        />

                                        

                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

           
              </div>
        )
    }

}