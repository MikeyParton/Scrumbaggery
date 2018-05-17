import styled from 'styled-components'

export const BoardContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;

  > * {
    &:not(first-child) {
      margin-right: 20px;
    }
  }
`
