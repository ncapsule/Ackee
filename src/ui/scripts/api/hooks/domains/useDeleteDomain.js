import { useMutation, gql } from '@apollo/client'

import deleteIdModify from '../../utils/deleteIdModify'

const MUTATION = gql`
	mutation deleteDomain($id: ID!) {
		deleteDomain(id: $id) {
			success
		}
	}
`

const update = (id) => (cache) => {
	cache.modify({
		fields: {
			domains: deleteIdModify(id)
		}
	})
}

export default (id) => {

	const [ mutate, { loading, error }] = useMutation(MUTATION, {
		variables: {
			id
		}
	})

	return {
		mutate: (opts) => mutate({
			update: update(id),
			...opts
		}),
		loading,
		error
	}

}