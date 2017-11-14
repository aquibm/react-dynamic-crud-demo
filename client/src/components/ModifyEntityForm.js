import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import controlRegistry from './controls/controlRegistry'

export default class ModifyEntityForm extends PureComponent {
    propTypes = {
        schema: PropTypes.object.isRequired,
        entity: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired,
        persistChanges: PropTypes.func.isRequired,
    }

    state = {
        errors: [],
    }

    _save = () => {
        const { schema, entity, persistChanges } = this.props
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

        persistChanges()
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
                        onChange={this.props.handleChange(field.name)}
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
        const { schema, entity } = this.props
        const { errors } = this.state

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
