import React from "react"
import Navbar from "../components/Navbar"
import { base_url, product_image_url } from "../Config.js";
import $ from "jquery"
import axios from "axios"
import 'bootstrap';
export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            adminName: null,
            admins: [],
            action: "",
            nik: "",
            status: "Pengaduan",
            image: "",
            uploadFile: true,
            id_petugas: "",
            id_pengaduan:0,
            pelapor:"",
            isi_laporan:"",
            id_nik:"",
            tanggapan:""
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
        this.setState({adminName: admin.nama})
        this.setState({id: admin.id})
        this.setState({id_nik: admin.nik})

    }

    getPengaduan = () => {
        let admin = JSON.parse(localStorage.getItem('admin'))
        let url = base_url + "/product/detail/tang/"+ admin.nik
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
            let url = base_url + "/product/" + selectedItem.id_pengaduan
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))
            let ur = base_url + "/tanggapan/adu/" + selectedItem.id_pengaduan
            axios.delete(ur, this.headerConfig())
            .then(response => {
                
                this.getPengaduan()
            })
            .catch(error => console.log(error))
        }
    }


    Edit = selectedItem => {
        $('#modal_product').modal('show')
        this.setState({
            action: "update",
            nik: selectedItem.nik,
            id_pengaduan: selectedItem.id_pengaduan,
            pelapor: selectedItem.pelapor,
            isi_laporan:selectedItem.isi_laporan,
            status: selectedItem.status,
            image: null,
            uploadFile: false
        })
    }
    Add = () => {
        $('#modal_product').modal('show')
        this.setState({
            action: "insert",
            product_id: 0,
            id_pengaduan: "",
            pelapor: "",
            isi_laporan:"",
         
            image: null,
            uploadFile: true
        })
    }
    update = event => {
        event.preventDefault()
        let admin = JSON.parse(localStorage.getItem('admin'))
        let form = new FormData()
        form.append("nik",admin.nik)
        form.append("id_pengaduan", this.state.id_pengaduan)
        form.append("status", this.state.status)
        form.append("isi_laporan", this.state.isi_laporan)
        form.append("pelapor", this.state.adminName)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/product"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))

            
        } else if(this.state.action === "update") {
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
                    <br></br>
                    <center><h3 className="text-bold text-black mt-2">List Laporan</h3></center>
                    <br/>
                        {this.state.admins.map((item, index) => (
                            
                          
                                 <div className="col-lg-12 col-sm-12 p-2 shadow-lg p-3 mb-5 bg-body bg-primary rounded border border-5 border border-black">
                                 <div className="card">
                                     <div className="card-body row" >
                                         {/* menampilkan Gambar / cover */}
                                         <div className="col-5">
                                         <img src={product_image_url + "/" + item.image} className="img-thumbnail border border-5 border border-black"
                                        height="250" width="250" alt="cant open"></img>
                                         </div>
                 
                                         {/* menampilkan deskripsi */}
                                         <div className="col-7">
                                             <h5 className="text-info">
                                             {item.isi_laporan}
                                            
                                             </h5>
                                             <h6 className="text-danger">
                                                 Status : {item.status}
                                             </h6>
                                             <h6 className="text-dark">
                                             Tgl Laporan : {item.createdAt}
                                             </h6>
                 
                                             <h6 className="text-dark">
                                             Pelapor : {item.pelapor}
                                             </h6>
                                             {item.tanggapan.map((y) =>
                                             <h6 className="text-dark">
                                            Tanggapan : {y.tanggapan}
                                             </h6>
                                             )}
                                             <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                       onClick={() => this.drop(item)}>
                                            Hapus
                                        </button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         ))} 
                    <button className="btn btn-success" onClick={() => this.Add()}>
                       Buat Pengaduan
                    </button>
                

                      {/* modal product  */}
                 <div className="modal fade" id="modal_product">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Product</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.update(ev)}>
                                     
                                    

                                    Laporan
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.isi_laporan}
                                     onChange={ev => this.setState({isi_laporan: ev.target.value})}
                                     required
                                     />
                                

                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Image
                                        </button>
                                    ) : (
                                        <div>
                                            Product Image
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
                                            
                                            required
                                            />
                                        </div>
                                    ) }

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
              </div>
        )
    }

}