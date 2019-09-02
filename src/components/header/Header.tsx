import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const HeaderEl = styled.header`
  background-color: rgba(0, 0, 0, 0.01);
  margin-bottom: 1.45rem;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

export const Header = ({ siteTitle }: any) => (
  <HeaderEl>
    <Container>
      <h1 style={{ margin: 0 }}>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </h1>
    </Container>
  </HeaderEl>
);
