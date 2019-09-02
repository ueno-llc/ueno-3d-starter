module.exports = {
  siteMetadata: {
    title: 'Ueno 3D Starter',
    description: '',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ueno-3d-starter',
        short_name: 'starter',
        start_url: '/',
        background_color: '#333333',
        theme_color: '#333333',
        display: 'minimal-ui',
        icon: 'src/assets/images/gatsby-icon.png',
      },
    },
  ],
};
