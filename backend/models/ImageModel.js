const express = require("express");
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageSchema = new Schema({ 
    img: { 
       data: Buffer, 
       contentType: String 
    }
 }
);
module.exports = mongoose.model('Image',imageSchema);