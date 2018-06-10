import React from 'react'
import Modal from 'components/Modal/Modal'
import { BoardConsumer } from '../BoardContext'
import { Query } from 'react-apollo'
import { CARD_DETAIL_QUERY } from 'data'

const CardDetail = (props) => {
  return (
    <BoardConsumer>
      {({ viewingCardId, setViewingCardId, cardModalOpen }) => (
        <Modal
          open={cardModalOpen}
          onClose={setViewingCardId}>
          <Query
            query={CARD_DETAIL_QUERY}
            variables={{ id: viewingCardId }}>
            {({ data, loading, error }) => {
              if (loading) return <div>...loading</div>
              if (error) return <div>...error</div>

              return (
                <div>
                <Modal.Header>
                  {data.card.name}
                </Modal.Header>
                <Modal.Content>
                </Modal.Content>
                </div>
              )
            }}
          </Query>
        </Modal>
      )}
    </BoardConsumer>
  )
}

export default CardDetail
