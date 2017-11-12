import React, { Component } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema, getEntityList } from 'api/entity'

class ListEntitiesPage extends Component {
    state = {
        schema: {},
        entities: [],
        isLoading: true,
    }

    componentWillMount() {
        this.initialState = this.state
    }

    componentDidMount() {
        const { match } = this.props
        const { entityType } = match.params

        this.hydrateState(entityType)
    }

    componentWillReceiveProps(nextProps) {
        const { entityType } = this.props.match.params
        const { entityType: nextEntityType } = nextProps.match.params

        if (entityType !== nextEntityType) this.hydrateState(nextEntityType)
    }

    hydrateState(entityType) {
        this.setState({ ...this.initialState })

        const hydrationPromises = [
            loadSchema(entityType),
            getEntityList(entityType),
        ]

        Promise.all(hydrationPromises).then((schema, entities) => {
            this.setState(state => ({
                schema,
                entities,
                isLoading: false,
            }))
        })
    }

    _onAddNewEntity = () => {
        const { history, match } = this.props
        const { entityType } = match.params
        history.push(`/entity/add/${entityType}`)
    }

    render() {
        const { entity } = this.props.match.params
        const { isLoading } = this.state

        if (isLoading) return <div>Loading...</div>

        return (
            <div>
                <div className="container">
                    <button
                        className="button is-primary"
                        onClick={this._onAddNewEntity}
                    >
                        Add new {entity}
                    </button>
                </div>

                <div className="container">
                    TODO(AM): Add a table of entities
                </div>
            </div>
        )
    }
}

export default PageHoc(ListEntitiesPage)
