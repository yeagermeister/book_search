import { gql } from "@apollo/client";

export const GET_ME = gql`
    query Get_Me($userId: ID!) {
        getUserById(userId: $userId) {
        savedBooks {
            authors
            bookId
            description
            image
            link
            title
        }
        }
    }
`