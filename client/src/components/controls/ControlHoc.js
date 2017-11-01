import React, { PureComponent } from 'react'

export default WrappedControl =>
    class extends PureComponent {
        validate() {}

        validateRequiredField() {}

        validatePattern() {}

        validateLength() {}

        render() {
            return <WrappedControl {...this.props} />
        }
    }
