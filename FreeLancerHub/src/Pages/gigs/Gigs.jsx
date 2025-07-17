import React, { useState,useRef } from "react";
import "./Gigs.scss";
import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useEffect } from "react";

const Gigs = () => {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [min,setMin]=useState("");
  const [max,setMax]=useState("");

  const location=useLocation();
  const {search}=location;
  const params=new URLSearchParams(search);
  const category=params.get("cat");

  let gigUrl=search ? `/gigs${search}&min=${min}&max=${max}&sort=${sort}` : 
  (min != undefined && max != undefined) ? `/gigs?min=${min}&max=${max}&sort=${sort}` : `/gigs?sort=${sort}` ;
  

  const {isLoading,error,data,refetch}=useQuery({
    queryKey: ['gigs'],
    queryFn:()=>{
      return newRequest.get(
          //`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
          gigUrl
        )
        .then((res) => {
          return res.data;
        })
    }
  })
  console.log(data)

  const openMenu=()=>{
    setOpen(!open);
  }

  const handelSort=(sortBy)=>{
    setSort(sortBy);
    setOpen(false);
  }
  const handelApply=()=>{
    refetch();
  }
  useEffect(()=>{
    refetch();
  },[sort])
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumb"><Link to="/">Home</Link> {">"} Gigs</span>
        <h1>AI Artist</h1>
        <p>
          Explore the boundary of art and technology with fiverr's AI artist
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="number" placeholder="min" value={min} onChange={(e)=>setMin(e.target.value)}/>
            <input type="number" placeholder="max" value={max} onChange={(e)=>setMax(e.target.value)} />
            <button onClick={handelApply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortBy">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img onClick={openMenu} src="./img/down.png" alt="" />
            {open && (
              <div className="rightMenu">
                {
                  sort != "createdAt" ? <span onClick={()=>handelSort('createdAt')}>Newest</span>
                  :
                  <span onClick={()=>handelSort('sales')}>Best Selling</span>
                }
                
                
              </div>
            )}
          </div>
        </div>
        <div className="cards">
           {isLoading ? "Loading..." : error ? "Something went wrong" : data.length ?  data.map(gig=>{
                return <GigCard key={gig._id}  item={gig}/>
           }) :
           <div className="notFound">
              <h4>Gigs will be comming soon on {category} category </h4>
           </div>
          
          }
        </div>
      </div>
    </div>
  );
};

export default Gigs;
