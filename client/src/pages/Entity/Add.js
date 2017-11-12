import React, { PureComponent } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema, createEntity } from 'api/entity'
import controlRegistry from 'components/controls/controlRegistry'

class AddEntityPage extends PureComponent {
    state = {
        schema: {},
        entity: {},
        errors: {},
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

    _save = () => {
        const { schema, entity } = this.state
        const { history } = this.props

        const errors = schema.fields.reduce(
            (errors, field) =>
                (errors = { ...errors, [field.name]: field.ref.validate() }),
            {},
        )

        if (this.hasErrors(errors)) {
            this.setState({ errors })
            return
        }

        createEntity(entity).then(() => {
            history.push(`/entity/list/${entity.type}`)
        })
    }

    hasErrors = errorMap => {
        const keys = Object.keys(errorMap)
        const allErrors = keys
            .map(key => errorMap[key])
            .reduce((acc, list) => (acc = [...acc, ...list]), [])

        return allErrors.length > 0
    }

    renderControl(field, entity, errors) {
        const Control = controlRegistry[field.control]
        const value = entity.fields[field.name]

        return (
            <div className="field" key={field.name}>
                <label className="label">{field.label}</label>

                <div className="control">
                    <Control
                        field={field}
                        value={value}
                        onChange={this._handleChange(field.name)}
                        ref={control => (field.ref = control)}
                    />
                </div>

                {errors &&
                    errors.map((error, idx) => (
                        <p key={idx} className="help is-danger">
                            {error}
                        </p>
                    ))}
            </div>
        )
    }

    render() {
        const { schema, entity, errors } = this.state
        return (
            <div>
                {schema.fields && (
                    <div>
                        {schema.fields.map(field =>
                            this.renderControl(
                                field,
                                entity,
                                errors[field.name],
                            ),
                        )}

                        <button className="button is-info" onClick={this._save}>
                            Save
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

export default PageHoc(AddEntityPage)
