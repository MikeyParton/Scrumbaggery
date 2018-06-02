import gql from 'graphql-tag'

const cardFragment = gql`
  fragment BoardDetailPageCard on Card {
    id
    name
  }
`

export const BoardDetailPageFragments = {
  card: cardFragment,
  list: gql`
    fragment BoardDetailPageList on List {
      id
      name
      cards {
        ...BoardDetailPageCard
      }
    }
    ${cardFragment}
  `
}

export const CARD_DETAIL_QUERY = gql`
  query CardDetail($id: ID!) {
    card(id: $id) {
      id
      name
      description
      list {
        ...BoardDetailPageList
      }
    }
  }
  ${BoardDetailPageFragments.list}
`

export const BOARD_DETAIL_QUERY = gql`
  query BoardDetail($id: ID!) {
    board(id: $id) {
      id
      name
      lists {
        ...BoardDetailPageList
      }
    }
  }
  ${BoardDetailPageFragments.list}
`

// CARD MUTATIONS

export const ADD_CARD_MUTATION = gql`
  mutation AddCard($list_id: ID!, $name: String!) {
    create_card(list_id: $list_id, name: $name) {
      ...BoardDetailPageCard
    }
  }
  ${cardFragment}
`

export const MOVE_CARD_MUTATION = gql`
  mutation MoveCard($id: ID!, $position: Int!, $list_id: ID!) {
    move_card(id: $id, position: $position, list_id: $list_id) {
      id
    }
  }
`

// LIST MUTATIONS

export const ADD_LIST_MUTATION = gql`
  mutation AddList($board_id: ID!, $name: String!) {
    create_list(board_id: $board_id, name: $name) {
      ...BoardDetailPageList
    }
  }
  ${BoardDetailPageFragments.list}
`

export const MOVE_LIST_MUTATION = gql`
  mutation MoveList($id: ID!, $position: Int!) {
    move_list(id: $id, position: $position) {
      id
    }
  }
`

export const DELETE_LIST_MUTATION = gql`
  mutation DeleteList($id: ID!) {
    delete_list(id: $id) {
      id
    }
  }
`
