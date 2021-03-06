import React from 'react';
import { Flex, IconButton } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { NavItem } from 'components/NavItem';
const Navigation: React.FC = () => {
  const history = useHistory();

  return (
    <Flex position="absolute" top="12px" zIndex={2}>
      <IconButton
        icon="arrow-left"
        aria-label="Back"
        variant="link"
        size="sm"
        mr={4}
        onClick={() => history.goBack()}
      />
      <NavItem text="Posts" to="/awarewolf" />
      <NavItem text="Create Post" to="/awarewolf/create" />
    </Flex>
  );
};

export default Navigation;
