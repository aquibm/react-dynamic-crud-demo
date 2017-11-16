import React, { PureComponent } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema, getEntity, updateEntity } from 'api/entity'
import ModifyEntityForm from 'components/ModifyEntityForm'

class EditEntityPage extends PureComponent {
    state = {
        schema: {},
        entity: {},
    }

    componentDidMount() {
        const { entityType, entityId } = this.props

        const loadPromises = [loadSchema(entityType), getEntity(entityId)]

        Promise.all(loadPromises).then(([schema, entity]) => {
            this.setState({
                schema,
                entity,
            })
        })
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

        updateEntity(entity).then(() => {
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

export default PageHoc(EditEntityPage)
