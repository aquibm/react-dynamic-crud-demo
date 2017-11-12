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

    renderEntity(entity) {
        const { id, fields } = entity
        const keys = Object.keys(fields)

        return (
            <tr key={id}>
                {keys.map(key => <td key={key}>{fields[key]}</td>)}

                {/* Controls */}
                <td className="buttons has-addons">
                    <a className="button" href="#">
                        Edit
                    </a>

                    <a className="button is-danger" href="#">
                        Delete
                    </a>
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
                            <td key={field.name}>{field.label}</td>
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
                        Add new {entityType}
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
