import "./profile.css"
import React, { Component } from 'react'
import user from "./user.svg"
import edit from "./edit.svg"

class Profile extends Component {
  render() {
    return (
      <div className="profile">
          <div className="profile-card">
              <div className="info">
                <div className="img">
                    <img src={user} alt="User"/>
                </div>
                <p>Changer l'image</p>
                <div className="name">
                    <h1>Fikri Zakaria<span className="edit"><img src={edit} alt="edit"/></span></h1>
                </div>
                <div className="info-text">
                    <div className="email">
                        Email : fikrizakaria@outlook.com<span className="edit"><img src={edit} alt="edit"/></span>
                    </div>
                    <div className="address">
                        Adresse : xxxxx xxxxxxxxxxxxx xxxxxxxxx<span className="edit"><img src={edit} alt="edit"/></span>
                    </div>
                    
                </div>
                
              </div>
          </div>
      </div>
    )
  }
}

export default Profile
