import React, { PureComponent } from 'react'

export default WrappedControl =>
    class extends PureComponent {
        validate() {
            const errors = [
                this.validateRequiredField(),
                this.validatePattern(),
            ].filter(error => error !== undefined)

            return errors
        }

        validateRequiredField() {
            const { field, value } = this.props

            if (
                field.required &&
                (value === undefined || value === null || value === '')
            )
                return `No value provided for '${field.label}'`
        }

        validatePattern() {
            const { field, value } = this.props
            if (!field.pattern) return

            const regex = RegExp(field.pattern)

            if (!regex.test(value))
                return `The field '${field.label}' does not match its specified pattern.`
        }

        render() {
            return <WrappedControl {...this.props} />
        }
    }
