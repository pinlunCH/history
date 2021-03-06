import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import AlbumListItem from '../AlbumListItem/index';
import GenericList from '../../components/GenericList';

import { loadGallery } from './actions';
import {
  selectGalleryLoading,
  selectGalleryError,
  selectItems,
} from './selectors';
import reducer from './reducer';
import globalReducer from '../App/reducer';
import saga from './saga';
import messages from './messages';

export function GalleryViewPage({
  match: {
    params: { gallery, host },
  },
}) {
  const dispatch = useDispatch();
  useInjectReducer({ key: 'galleryViewPage', reducer });
  useInjectReducer({ key: 'global', reducer: globalReducer });
  useInjectSaga({ key: 'galleryViewPage', saga });

  const galleryLoading = useSelector(selectGalleryLoading);
  const galleryError = useSelector(selectGalleryError);
  const items = useSelector(selectItems);

  useEffect(() => {
    if (gallery) {
      dispatch(loadGallery({ host, gallery }));
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Galleries</title>
      </Helmet>
      <FormattedMessage {...messages.header} />
      <GenericList
        loading={galleryLoading}
        error={galleryError}
        items={items}
        component={AlbumListItem}
      />
    </div>
  );
}

export default memo(GalleryViewPage);
