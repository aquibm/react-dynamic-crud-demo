import React, { PureComponent } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema, createEntity } from 'api/entity'
import ModifyEntityForm from 'components/ModifyEntityForm'

class AddEntityPage extends PureComponent {
    state = {
        schema: {},
        entity: {},
    }

    componentDidMount() {
        const { entityType } = this.props
        loadSchema(entityType).then(schema =>
            this.setState({
                schema,
                entity: this.getEmptyEntityFromSchema(schema),
            }),
        )
    }

    getEmptyEntityFromSchema(schema) {
        const entity = { type: schema.type, fields: {} }

        schema.fields.forEach(field => (entity.fields[field.name] = ''))
        return entity
    }

    _handleChange = fieldName => event => {
        const { value } = event.target

        this.setState(state => ({
            schema: state.schema,
            entity: {
                ...state.entity,
                fields: {
                    ...state.entity.fields,
                    [fieldName]: value,
                },
            },
        }))
    }

    _persistChanges = () => {
        const { entity } = this.state
        const { history } = this.props

        createEntity(entity).then(() => {
            history.push(`/entity/list/${entity.type}`)
        })
    }

    render() {
        const { schema, entity } = this.state
        return (
            <ModifyEntityForm
                schema={schema}
                entity={entity}
                handleChange={this._handleChange}
                persistChanges={this._persistChanges}
            />
        )
    }
}

export default PageHoc(AddEntityPage)
