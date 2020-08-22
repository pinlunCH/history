const credentials = {
  flickr: {
    api_key: '80e270fc9e115722bea6252237ab5279',
  },
};

const isNode = (typeof module !== 'undefined' && typeof module.exports !== 'undefined');

if (isNode) {
  module.exports = {
    flickr: credentials.flickr,
  };
}
