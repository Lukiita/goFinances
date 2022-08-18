import React from 'react';

import {
  Container,
  Header, Icon, Photo,
  User,
  UserGreeting, UserInfo, UserName, UserWrapper
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/11157950?v=4' }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>

          <Icon name='power' />
        </UserWrapper>

      </Header>
    </Container>
  )
}