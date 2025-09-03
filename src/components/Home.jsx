import React from 'react'
import './Home.css'
const Home = () => {
    return (
        <div className="flex " >
            <div className="row justify-content-evenly" style={{ backgroundColor: "#febf31" }}>
                <div className="col-8 ms-5 ps-5" style={{ color: "black", padding: "10px" }}>
                    <h5 className="text-center pt-3" > Checkout Our Exciting new launches</h5></div>
                <div className="col-2 icon-bar ms-5">
                    <i className="bi bi-facebook" style={{ fontSize: "2rem" }}></i>
                    <i className="bi bi-instagram" style={{ fontSize: "2rem" }}></i>
                    <i className="bi bi-youtube" style={{ fontSize: "2rem" }}></i>
                    <i className="bi bi-linkedin" style={{ fontSize: "2rem" }}></i>
                    <i className="bi bi-envelope-fill" style={{ fontSize: "2rem" }}></i>
                </div>

            </div>

            <div className="row">
                <div className='col-2 '>
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/bxn4s0bj_expires_30_days.png"}
                        className="ml-5 mt-3 " style={{ height: "100px", width: "200px", objectFit: "contain" }}
                        alt="Logo"
                    />
                </div>
                <div className=" col-8 flex items-center mt-3" style={{fontSize:"20px", fontWeight:"500"}} >
                    <span className="text-center" >
                        {"Products"}
                    </span>
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/2eksad0c_expires_30_days.png"}
                        className="w-6 h-6 mr-[26px] object-fill"
                        alt="Arrow"
                    />
                    <span className="text-[#1E1E1E] text-base mr-[3px]" >
                        {"Shop by purpose"}
                    </span>
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/0xrbgk8b_expires_30_days.png"}
                        className="w-6 h-6 mr-[26px] object-fill"
                        alt="Arrow"
                    />
                    <span className="text-[#1E1E1E] text-base mr-[3px]" >
                        {"Siddh collection"}
                    </span>
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/04d5owxb_expires_30_days.png"}
                        className="w-6 h-6 mr-[26px] object-fill"
                        alt="Arrow"
                    />
                    <span className="text-[#1E1E1E] text-base mr-0.5" >
                        {"Sawan Sale"}
                    </span>
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/m3pjo81t_expires_30_days.png"}
                        className="w-6 h-6 mr-[26px] object-fill"
                        alt="Arrow"
                    />
                    <span className="text-[#1E1E1E] text-base mr-[3px]" >
                        {"Astro Stone"}
                    </span>
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/9qfvy7ii_expires_30_days.png"}
                        className="w-6 h-6 mr-[26px] object-fill"
                        alt="Arrow"
                    />
                    <span className="text-[#1E1E1E] text-base mr-[3px]" >
                        {"Festival"}
                    </span>
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/zc73xk90_expires_30_days.png"}
                        className="w-6 h-6 object-fill"
                        alt="Arrow"
                    />


                </div>
                    <div className='col-2 mt-3 ' style={{display:"grid",gridTemplateColumns:" repeat(5, 1fr)" }} >
                     <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/usti218l_expires_30_days.png"}
                        className="icon-img"
                        alt="Icon"
                    />
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/rdyh30hu_expires_30_days.png"}
                        className="icon-img"
                        alt="Icon"
                    />
                    <img
                        src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/WqsbpufRVU/206cicc1_expires_30_days.png"}
                        className="icon-img "
                        alt="Icon"
                    />
                    </div>
                </div>
            </div>
      

    )
}

export default Home