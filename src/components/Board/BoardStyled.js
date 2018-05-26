import styled from 'styled-components'

export const BoardContainer = styled.div`
  padding: 20px;
  display: flex;

  > * {
    &:not(first-child) {
      margin-right: 20px;
    }
  }
`
