import React from "react";

export const Loading = () => {
    return(
        <div className="col-12 text-center" style={{backgroundColor: "rgb(255, 193, 0)", width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <span className="fa fa-circle-o-notch fa-spin fa-5x"></span>
        </div>
    )
}