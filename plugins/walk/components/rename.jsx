/* global document, fetch, getQueryByName */
import React from 'react';

function getAllFilenames() {
  const previews = Array.from(document.querySelectorAll('.preview'));
  const filenames = previews.map(p => p.getAttribute('data-filename'));

  return filenames;
}

const getDate = () => document.getElementById('date').value;

function onClick() {
  const filenames = getAllFilenames();
  const prefix = getDate();
  const sourceFolder = getQueryByName('path');

  /*
  curl -d '{"filenames":["2001-03-21-01.jpg","2012-fireplace.jpg","2014-02-08-14.jpg"], "prefix": "2017-10-10",
  "source_folder": "/galleries/gallery-demo/media/photos/lots", "preview": "true", "raw": "true"}'
  -i http://127.0.0.1:8000/admin/rename  -H "Content-Type: application/json"
   */
  const data = {
    filenames,
    prefix,
    source_folder: sourceFolder,
    preview: true,
    raw: true
  };
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };

  return fetch('/admin/rename', options)
    .then(response => response.json())
    .then((payload) => {
      console.log(payload);
    })
    .catch(error => console.log(error.message));
}

function Rename() {
  return (
    <button
      key="rename"
      onClick={onClick}
    >
      Rename
    </button>
  );
}

module.exports = Rename;