import React from "react"
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Printadu from "./pages/printpengaduan"
import PrintT from "./pages/printtanggapan"
import Pengaduan from "./pages/pengaduan"
import Tanggapan from "./pages/tanggapan"
import Home from "./pages/Home"


export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/pengaduan" component={Pengaduan} />
        <Route path="/tanggapan" component={Tanggapan} />
        <Route path="/printadu" component={Printadu} />
        <Route path="/printt" component={PrintT} />
      </Switch>
    )
  }
}