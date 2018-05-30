import styled from 'styled-components'

export const BoardContainer = styled.div`
  padding: 20px 0 20px 20px;
  display: flex;
  align-items: flex-start;

  > * {
    &:not(last-child) {
      margin-right: 20px;
    }
  }
`
