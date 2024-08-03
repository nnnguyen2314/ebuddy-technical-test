import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";

const StyledMainNav = styled.ul`
  display: flex;
  align-items: center;
  padding-left: 0;
  list-style: none;
  
  .main-nav-item {
    .main-nav-item-active {
      font-weight: 600;
    }
    
    a {
      padding: 26px 15px;
      color: #3E3E3E;
    }
  }
`

const menuItems = [
    {
        label: 'Home',
        pathname: '/'
    },
    {
        label: 'Share your video',
        pathname: '/video/share'
    }
];

interface MainNavProps {
    displayMode?: 'horizontal';
}

const MainNav = (props: MainNavProps) => {
    const router = useRouter();

    return (
        <StyledMainNav className="main-nav">
            {
                menuItems.map((item, index) => {
                    return (
                        <li key={index} className="main-nav-item">
                            <Link className={router.pathname === item.pathname ? 'main-nav-item-active' : ''} href={{
                                pathname: item.pathname
                            }}>{item.label}</Link>
                        </li>
                    )
                })
            }
        </StyledMainNav>
    )
};

export default MainNav;