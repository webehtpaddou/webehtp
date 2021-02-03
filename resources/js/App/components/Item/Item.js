import React, { Component } from 'react'
import "./item.css"

class Item extends Component {
  render() {
    return (
        <div className="item el-wrapper">
            <div className="box-up">
                <img className="img" src={this.props.img} alt=""/>
                <div className="img-info">
                    <div className="info-inner">
                        <span className="p-name">{this.props.name}</span>
                        <span className="p-company">{this.props.brand}</span>
                    </div>
                    <div className="a-size">Tailles disponibles : <span className="size">{this.props.sizes}</span></div>
                </div>
            </div>

            <div className="box-down">
                <div className="h-bg">
                    <div className="h-bg-inner"></div>
                </div>

                <div onClick={this.props.handleClick} className="cart">
                    <span className="price">{this.props.price} DH</span>
                    <span className="add-to-cart">
                        <span className="txt">+ Details</span>
                    </span>
                </div>
            </div>
            
        </div>
    )
  }
}

export default Item
