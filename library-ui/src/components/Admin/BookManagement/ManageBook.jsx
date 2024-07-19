import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Sidebar from '../Sidebar.jsx';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './ManageBook.css';

const ManageBook = () => {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    authors: "",
    edition: "",
    format: "",
    num_pages: "",
    rating: "",
    rating_count: "",
    review_count: "",
    genres: "",
    genre_list: "",
    image_url: "",
    Quote1: "",
    Quote2: "",
    Quote3: "",
    description: ""
  });

  const navigate = useNavigate();

  const postBookData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get("http://localhost:6868/api/books", {
        headers: {
          "x-access-token": accessToken,
        },
      });
      axios.post("http://localhost:6868/api/books", formData,{
        
        headers: {
            "x-access-token": accessToken,
          },
      })
      .then((response) => {
        
        
        setFormData({
            id: "",
            title: "",
            authors: "",
            edition: "",
            format: "",
            num_pages: "",
            rating: "",
            rating_count: "",
            review_count: "",
            genres: "",
            genre_list: "",
            image_url: "",
            Quote1: "",
            Quote2: "",
            Quote3: "",
            description: ""
        });
      })
      if (response.ok) {
        const data = await response.json();
        console.log('Book added successfully:', data);
        // Optionally reset form or give user feedback
      } else {
        console.error('Failed to add book. Status:', response.status);
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };



  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div style={
      {
        marginLeft: '7.5vw',
        marginTop: '-17vw'
      }
    }>
      
      <div className="homebutton">
        <Button label="Admin"  onClick={() => { navigate('/admin') }} />
      </div>
      <div style={{ width: '83vw' }} className="card12">
        <div  className="p-fluid p-grid">
          <div className="col1">
            <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.id} onChange={(e) => handleChange('id', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">id</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">title</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.authors} onChange={(e) => handleChange('authors', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">authors</label>
            </span>
          </div>
          </div>
          <div className="col1">
            <div className="p-field2 p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.image_url} onChange={(e) => handleChange('image_url', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">image_url</label>
            </span>
          </div>
          <div className="p-field2 p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.edition} onChange={(e) => handleChange('edition', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">edition</label>
            </span>
          </div>
          <div className="p-field2 p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.format} onChange={(e) => handleChange('format', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">format</label>
            </span>
          </div>
          
          </div>
          <div className="col1">
            <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.num_pages} onChange={(e) => handleChange('num_pages', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">num_pages</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.rating} onChange={(e) => handleChange('rating', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">rating</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.rating_count} onChange={(e) => handleChange('rating_count', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">rating_count</label>
            </span>
          </div>
          </div>
          <div className="col1">
            <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.review_count} onChange={(e) => handleChange('review_count', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">review_count</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.genres} onChange={(e) => handleChange('genres', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">genres</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.genre_list} onChange={(e) => handleChange('genres_list', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">genre_list</label>
              </span>
          </div>
          </div>
          <div className="col1">
            <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.Quote1} onChange={(e) => handleChange('Quote1', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">Quote1</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.Quote2} onChange={(e) => handleChange('Quote2', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">Quote2</label>
            </span>
          </div>
          <div className="p-field p-col-12 p-md-4">
            <span className="p-float-label">
            <InputText id="inputtext" value={formData.Quote3} onChange={(e) => handleChange('Quote3', e.target.value)} style={{ width: '25vw' }} />
              <label htmlFor="inputtext">Quote3</label>
            </span>
          </div>
          </div>
          <div className="p-field p-col-12 p-md-4">
                <span className="p-float-label">
                    <InputTextarea id="textarea" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} style={{ width: '25vw' }}/>
                    <label htmlFor="textarea">description</label>
                </span>
            </div>
        </div>
        <div className="addbook">
            <Button label="Add book"  onClick={postBookData} />
        </div>
        
      </div>
    </div>
  );
};

export default ManageBook;