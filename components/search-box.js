import React,{useState, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import Link from 'next/link'
import {useRouter} from "next/router";

export default function SearchBox(props) {
  const router = useRouter();
  const [searchItem, setSearchItem] = useState(null);


  function handleSearch(e) {
    setSearchItem(e.target.value)
  }
  function handleSearchPassProps() {
    if(searchItem)  {
      let first= "/products/";
      let result= first.concat(searchItem)
      router.push(result);
      // window.location.replace(result);
    }

  }
  return (
    <>
      <div className="search-box">
        <button className="search-button">
          <FaSearch color="gray" size="15px"/>
        </button>
        <input
          value={searchItem}
          id="search"
          type="text"
          name="search"
          placeholder="Search products"
          onChange={handleSearch}
        />
        <button className="search-button" onClick={handleSearchPassProps}>
          <span style={{color:'gray',paddingRight:3}}>Search </span>
        </button>

      </div>
      <style jsx>{`
        .search-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: 12px;
          padding-right: 12px;
          height: 42px;
          background: #ffffff;
          border: 2px solid #f5f5f5;
          box-sizing: border-box;
          border-radius: 4px;
          width:30%;
        }
        .search-box .search-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          height: 100%;
        }
        .search-box .search-button:focus {
          outline: none;
        }
        .search-box .search-button:hover {
          opacity: 40%;
        }
        .search-box input {
          width: 75%;
          height: 100%;
          border: none;
          padding-left: 8px;
        }
        .search-box input:focus {
          outline: none;
        }
        .search-box select {
          align-self: flex-end;
          max-width: 120px;
          height: 100%;
          text-transform: uppercase;
          font-style: normal;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 1px;
          color: #b2b2b2;
          border: none;
          background: none;
        }
        .search-box select:focus {
          outline: none;
        }
        .search-button{
          background-color:orange;
         font-size:1.5rem;
         font-weight: 900;
        padding: 10px;
        color: white;
        font-size: 17px;
        border: 1px solid grey;
        border: none;
        cursor: pointer;

        }
      `}</style>
    </>
  );
}
