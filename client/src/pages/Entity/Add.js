import React, { PureComponent } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema } from 'api/loadSchema'
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

    _save = () => {
        const { schema } = this.state
        const errors = schema.fields.reduce(
            (errors, field) =>
                (errors = { ...errors, [field.name]: field.ref.validate() }),
            {},
        )

        this.setState({ errors })
    }

    renderControl(field, entity, errors) {
        const Control = controlRegistry[field.control]
        const value = entity[field.name]

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
