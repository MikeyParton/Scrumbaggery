import gql from 'graphql-tag'

export const BOARD_DETAIL_QUERY = gql`
  query BoardDetail($id: ID!) {
    board(id: $id) {
      id
      name
      lists {
        id
        name
        cards {
          id
          name
        }
      }
    }
  }
`

export const MOVE_LIST_MUTATION = gql`
  mutation MoveList($id: ID!, $position: Int!) {
    move_list(id: $id, position: $position) {
      id
    }
  }
`

export const MOVE_CARD_MUTATION = gql`
  mutation MoveCard($id: ID!, $position: Int!, $list_id: ID!) {
    move_card(id: $id, position: $position, list_id: $list_id) {
      id
    }
  }
`

export const ADD_CARD_MUTATION = gql`
  mutation AddCard($list_id: ID!, $name: String!) {
    create_card(list_id: $list_id, name: $name) {
      id
      name
      list {
        board_id
      }
    }
  }
`
