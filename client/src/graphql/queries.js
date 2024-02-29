import { gql } from '@apollo/client'

export const GET_ALL_NOTES = gql`
  query {
    getAllNotes {
      _id
      text
      user {
        username
      }
    }
  }
`

export const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      username
    }
  }
`

export const GET_USER_NOTES = gql`
  query {
    getUserNotes {
      _id
      text
    }
  }
`
