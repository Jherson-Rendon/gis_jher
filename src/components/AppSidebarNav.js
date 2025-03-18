// src/components/AppSidebarNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useColorModes } from '@coreui/react';

import { CBadge, CNavLink } from '@coreui/react';

export const AppSidebarNav = ({ items }) => {
  const { colorMode } = useColorModes();

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && <span>{name}</span>}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to && {
          component: NavLink,
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={rest.visible}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    );
  };

  return (
    <>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
