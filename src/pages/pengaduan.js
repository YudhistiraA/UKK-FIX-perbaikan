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
            isi_laporan:"",
           

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
        let url = base_url + "/product/detail/tang/"
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
   
     
    Add = selectedItem => {
        let url = base_url + "/tanggapan/" + selectedItem.id_pengaduan
        axios.get(url, this.headerConfig())
        .then(response=> {
           if(response.data==null) {
             $("#modal_admin").modal("show")
        this.setState({
            id_pengaduan: selectedItem.id_pengaduan,
            tanggapan:""
        })
        }else{
            window.confirm("Tanggapan Sudah di isi")
        }
           
        })}
    
        saveA = event => {
            event.preventDefault()
            $("#modal_admin").modal("hide")
            let form = {
                tanggapan: this.state.tangggapan,
                id_petugas: this.state.id_petugas,
                id_pengaduan: this.state.id_pengaduan,
                
                
            
            }
            let url = base_url + "/tanggapan"
           
                axios.post(url,form,this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPengaduan()
                })
                .catch(error => console.log(error))
            
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
        $("#modal_product").modal("show")
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
    update = event => {
        event.preventDefault()
        let form = new FormData()
        form.append("nik", this.state.nik)
        form.append("id_pengaduan", this.state.id_pengaduan)
        form.append("status", this.state.status)
        form.append("isi_laporan", this.state.isi_laporan)
        form.append("pelapor", this.state.pelapor)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        let url = base_url + "/product"
      
      if(this.state.action === "update") {    
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPengaduan()
            })
            .catch(error => console.log(error))


            if(this.state.status === "Selesai") { 
            let url = base_url + "/tanggapan/" + this.state.id_pengaduan
            axios.get(url, this.headerConfig())
            .then(response=> {
               if(response.data==null) {
                 $("#modal_admin").modal("show")
            this.setState({
                id_pengaduan: this.state.id_pengaduan,
                tanggapan:""
            })
            }
               
            })
        }
            
        }
    }

    buttonE (selectedItem,kk)  {
        
        if( kk === "Selesai"){
            return null
           
        }else{
            return ( <button className="btn btn-sm btn-info m-1"
            onClick={() => this.Edit(selectedItem)}>
                Aksi
            </button>)
           
             }
         }
   button (selectedItem,kk)  {
        
        if( kk === "Selesai" || kk == "Pengaduan"){
            return null
           
        }else{
            return (<button className="btn btn-sm btn-warning m-1 text-white" onClick={() => this.Add(selectedItem)}> 
            Buat tanggapan</button>)
          
             }
         }
        
        
    render(){
        return (
            <div>
                <Navbar />
              
                <div className="container">
         <br/>
         <br/>
         <br/>
                <center><h3 className="text-bold text-black mt-2">List Laporan</h3></center>
                <br/>
                <div> <button className="btn btn-success "><a href="/printadu" className="text-white"> Generate PDF</a></button></div>
               
                <br/>
                <table className="table   ">
                        <thead class="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Nik Pelapor</th>
                                <th>Nama Pelapor</th>
                                <th>Laporan</th>
                                <th>Gambar</th>
                                <th>Tanggal Laporan</th>
                                <th>Status</th>
                                <th>Aksi</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {/*  {this.state.admins.filter(item => item.status != "Selesai").map((item, index) => (  */}
                         
                      
                      {this.state.admins.map((item, index) => (
                        
                        
                          
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nik}</td>
                                    <td>{item.pelapor}</td>
                                    <td>{item.isi_laporan}</td>
                                    <td><img src={product_image_url + "/" + item.image} class="img-thumbnail"
                                        height="150" width="150" alt="cant open"></img></td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {/* <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Aksi
                                        </button>*/}

                                        {this.button(item,item.status)}
                                        {this.buttonE(item,item.status)}

                                       <button className="btn btn-sm btn-danger m-1"
                                       onClick={() => this.drop(item)}>
                                            Hapus
                                         </button> 
                                   {/*  <button className="btn btn-sm btn-warning m-1 text-white" onClick={() => this.Add(item)}> 
                                        Buat tanggapan</button>*/}
               
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
                                   Tanggapan
                                        <input type="text" className="form-control mb-1"
                                         
                                        onChange={ev => this.setState({ tangggapan: ev.target.value})}
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

                      {/* modal product  */}
                 <div className="modal fade" id="modal_product">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Product</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.update(ev)}>
                                     
                                    

                                    

                                  
                                <select placeholder="status" className="form-control mb-1"  onChange={this.handleChange}>
                                
                               
                                <option value="Proses">Proses</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Pengaduan">Pengaduan</option>
                               
                                </select>
                              
                             
                                   

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