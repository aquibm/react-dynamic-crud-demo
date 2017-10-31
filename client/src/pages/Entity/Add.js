import React, { PureComponent } from 'react'
import PageHoc from 'hocs/PageHoc'
import { loadSchema } from 'api/loadSchema'

class AddEntityPage extends PureComponent {
    state = {
        schema: {},
    }

    componentDidMount() {
        const { entityType } = this.props
        loadSchema(entityType).then(schema => this.setState({ schema }))
    }

    render() {
        const { schema } = this.state
        return <div>{JSON.stringify(schema)}</div>
    }
}

export default PageHoc(AddEntityPage)
