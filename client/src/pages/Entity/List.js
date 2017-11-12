import React, { Component } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema, getEntityList, deleteEntity } from 'api/entity'
import { Link } from 'react-router-dom'

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

        Promise.all(hydrationPromises).then(([schema, entities]) => {
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

    _onDeleteEntity = entityId => event => {
        event.preventDefault()

        if (!window.confirm('Are you sure?')) return

        deleteEntity(entityId).then(() =>
            this.setState(state => {
                const deletedIndex = state.entities.findIndex(
                    entity => entity.id === entityId,
                )

                return {
                    ...state,
                    entities: [
                        ...state.entities.slice(0, deletedIndex),
                        ...state.entities.slice(
                            deletedIndex + 1,
                            state.entities.length,
                        ),
                    ],
                }
            }),
        )
    }

    renderEntity(entity) {
        const { id, fields, type } = entity
        const keys = Object.keys(fields)

        return (
            <tr key={id}>
                {keys.map(key => <td key={key}>{fields[key]}</td>)}

                {/* Controls */}
                <td className="buttons has-addons">
                    <Link className="button" to={`/entity/edit/${type}/${id}`}>
                        Edit
                    </Link>

                    <button
                        className="button is-danger"
                        onClick={this._onDeleteEntity(id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }

    renderEntityTable(schema, entities) {
        const { fields } = schema

        return (
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        {fields.map(field => (
                            <th key={field.name}>{field.label}</th>
                        ))}

                        <td>Controls</td>
                    </tr>
                </thead>
                <tbody>
                    {entities.map(entity => this.renderEntity(entity))}
                </tbody>
            </table>
        )
    }

    render() {
        const { entityType } = this.props.match.params
        const { isLoading, schema, entities } = this.state

        if (isLoading) return <div>Loading...</div>

        return (
            <div>
                <div className="container">
                    <button
                        className="button is-primary"
                        onClick={this._onAddNewEntity}
                    >
                        Add new {entityType.toLowerCase()}
                    </button>
                </div>

                <div className="container">
                    {this.renderEntityTable(schema, entities)}
                </div>
            </div>
        )
    }
}

export default PageHoc(ListEntitiesPage)
