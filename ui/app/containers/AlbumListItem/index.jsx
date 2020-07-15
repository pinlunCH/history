import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import FlexBox from './FlexBox';
import Img from '../../components/Img';
import Link from '../../components/Link';
import ListItem from '../../components/ListItem';

import { capitalize } from '../../utils/strings';
import { selectCritical } from '../App/selectors';

function AlbumListItem({ item }) {
  const critical = useSelector(selectCritical);
  if (!item || !critical) {
    return <ListItem key="albums-list-item" item={<div>Invalid album</div>} />;
  }

  const { gallery, host } = critical;
  const LinkToAlbum = () => (
    <Link to={`/view/${host}/${gallery}/${item.id}`}>
      {capitalize(item.name)}
    </Link>
  );

  const Album = (
    <FlexBox>
      <div>
        <Link to={`/view/${host}/${gallery}/${item.id}`}>
          <Img
            src={`http://localhost:8000/galleries/demo/media/thumbs/2004/${item.filename}`}
            alt="Gingerbread"
          />
        </Link>
      </div>
      <LinkToAlbum />
      <span>{item.h2}</span>
      <span>{item.year}</span>
    </FlexBox>
  );

  return <ListItem key={`albums-list-item-${item.id}`} item={Album} />;
}

export default memo(AlbumListItem);
