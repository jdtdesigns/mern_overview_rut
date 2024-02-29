import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      _id
      email
      username
    }
  }
`

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      username
    }
  }
`

export const CREATE_NOTE = gql`
  mutation CreateNote($text: String!) {
    createNote(text: $text) {
      _id
      text
    }
  }
`

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
      message
    }
  }
`

export const EDIT_NOTE = gql`
  mutation EditNote($text: String!, $note_id: ID) {
    editNote(text: $text, note_id: $note_id) {
      message
    }
  }
`

export const DELETE_NOTE = gql`
  mutation DeleteNote($note_id: ID) {
    deleteNote(note_id: $note_id) {
      message
    }
  }
`