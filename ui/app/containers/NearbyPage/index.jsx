import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';

const ImgWall = styled.section`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
  height: 100vh;
  overflow: scroll;
`;
const Stage = styled.div`
  display: flex;
`;
const Bullet = styled.li`
  list-style: none;
  margin-right: 10px;
  margin-bottom: 10px;
  background: azure;
`;
const Showcasebox = styled.section`
  width: 50%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`;
const Thumbnail = styled.img`
  float: left;
  width:  200px;
  height: 150px;
  object-fit: cover;
  &:hover{
    opacity: 0.5;
  }
`;
/**
 * Parse querystring from route
 * @param {string} find query name
 * @param {string} from route or URL
 * @returns {string}
 */
function parseQueryString(find, from) {
  if (!find || !from) return '';
  const parts = RegExp(`[?&]${find}(=([^&#]*)|&|#|$)`).exec(from);
  return parts ? parts[2] : '';
}
const flickrService = {
  url: 'https://www.flickr.com/services/rest/?method=',
  apiKey: '80e270fc9e115722bea6252237ab5279',
}

const Flickr = ({coordinates}) => {
  const [value, setValue] = useState('Default');
  const [thumb, setThumb] = useState('Click on thumbnail to view photo');
  const [active, setActive] = useState(false);
  useEffect(() => {
    async function transform(coordinates) {
      const split = coordinates.split(',');
      const long = split[0];
      const lat = split[1];
      getFetchResult(long, lat);
    }
    function getLargeThumb({ farm, id, secret, server }) {
      const result = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
      setActive(true);
      console.log('im on click', id, active);
      setThumb(result);
    }
    async function getFetchResult(long, lat) {
      const searchPath = `flickr.photos.search&api_key=${flickrService.apiKey}&lat=${lat}&lon=${long}&radius=2&radius_units=km&per_page=100&format=json&nojsoncallback=1`;
      const url = flickrService.url + searchPath;
      try{
        const response = await fetch(url);
        const result = await response.json();
        const html =  result.photos.photo.map((photo) =>
        <Bullet key={photo.id}>
          <Thumbnail
            style={{opacity: active ? 0.5 : ''}}
            onClick={(() => getLargeThumb(photo))}
            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`}
            alt={`${photo.title}`}
          />
        </Bullet>
        )
        setValue(html);
      } catch (error) {
        return { error: error.messages };
      }
    }
    transform(coordinates);
  }, []);

  return (
    <Stage>
      <ImgWall>
        {value}
      </ImgWall>
      <Showcasebox>
        <img src={thumb} alt="thumbnail"/>
      </Showcasebox>
    </Stage>
  )
}

// location is provided by react-router-dom
function NearbyPage({ location: { search: query } }) {
  const coordinates = parseQueryString('coordinates', query);
  return (
    <article>
      <Helmet>
        <title>Nearby</title>
        <meta name="description" content="Description of Nearby" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <Flickr coordinates={coordinates}/>
    </article>
  );
}

export default memo(NearbyPage);
