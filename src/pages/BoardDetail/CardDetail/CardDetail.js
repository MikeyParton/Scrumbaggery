import React from 'react'
import Modal from 'components/Modal/Modal'
import { BoardConsumer } from '../BoardContext'
import { compose, graphql } from 'react-apollo'
import { CARD_DETAIL_QUERY } from 'data'

const CardDetail = (props) => {
  console.log(props)
  return (
    <BoardConsumer>
      {({
        boardDetailQuery,
        viewingCardId,
        setViewingCardId
      }) => (
        <Modal
          open={viewingCardId}
          onClose={() => setViewingCardId(null)}>
          <Modal.Header>
            Card
          </Modal.Header>
          <Modal.Content>
            Content
          </Modal.Content>
        </Modal>
      )}
    </BoardConsumer>
  )
}

export default compose(
  graphql(CARD_DETAIL_QUERY, {
    name: 'cardDetailQuery',
    options: (props) => ({ variables: { id: 339 }})
  })
)(CardDetail)
