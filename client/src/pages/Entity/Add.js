import React, { PureComponent } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema } from 'api/loadSchema'
import controlRegistry from 'components/controls/controlRegistry'

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
        const entity = { type: schema.type }
        schema.fields.forEach(field => (entity[field.name] = ''))
        return entity
    }

    _handleChange = fieldName => event => {
        const { value } = event.target

        this.setState(state => ({
            schema: state.schema,
            entity: {
                ...state.entity,
                [fieldName]: value,
            },
        }))
    }

    renderControl(field, entity) {
        const Control = controlRegistry[field.control]
        const value = entity[field.name]

        return (
            <div key={field.name}>
                <span>{field.label}</span>
                <Control
                    field={field}
                    value={value}
                    onChange={this._handleChange(field.name)}
                />
            </div>
        )
    }

    render() {
        const { schema, entity } = this.state
        return (
            <div>
                {schema.fields &&
                    schema.fields.map(field =>
                        this.renderControl(field, entity),
                    )}
            </div>
        )
    }
}

export default PageHoc(AddEntityPage)
