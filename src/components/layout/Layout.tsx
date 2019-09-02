import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Styles } from '../../styles/base';
import { Header } from '../header/Header';

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

export const Layout = ({ children }: any) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Styles />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Content>
        <main>{children}</main>
      </Content>
    </>
  );
};
