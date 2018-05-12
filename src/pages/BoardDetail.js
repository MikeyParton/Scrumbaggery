import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import List from 'components/List/List'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const BoardContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;

  > * {
    &:not(first-child) {
      margin-right: 20px;
    }
  }
`

const GET_BOARD_DETAIL = gql`
  query board($id: ID!) {
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

const BoardDetail = () => {
  return (
    <Query query={GET_BOARD_DETAIL} variables={{ id: 6 }}>
     {({ loading, error, data }) => {
       if (loading) return <div>Loading...</div>
       if (error) return <div>Error</div>

       const { board: { name, lists, id } } = data

       return (
         <DragDropContext onDragEnd={() => {}}>
           <Droppable
             type="list"
             direction="horizontal"
             droppableId={`board-${id}`}
            >
             {(provided, snapshot) => (
               <BoardContainer innerRef={provided.innerRef}>
                 {lists.map((list, index) => (
                   <Draggable
                     type="list"
                     key={list.id}
                     draggableId={`list-${list.id}`}
                     index={index}
                    >
                     {(provided2, snapshot2) => (
                       <List
                         provided={provided2}
                         snapshot={snapshot2}
                         id={list.id}
                         name={list.name}
                         items={list.cards}
                       />
                     )}
                   </Draggable>
                 ))}
                 {provided.placeholder}
              </BoardContainer>
             )}
           </Droppable>
         </DragDropContext>
       )
     }}
    </Query>
  )
}

export default BoardDetail
