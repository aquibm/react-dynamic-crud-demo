import React, { PureComponent } from 'react'

import AddEntityPage from './Add'
import EditEntityPage from './Edit'

export default class extends PureComponent {
    render() {
        const { match } = this.props
        const { entityType, entityId } = match.params

        return !entityId ? (
            <AddEntityPage entityType={entityType} {...this.props} />
        ) : (
            <EditEntityPage
                entityType={entityType}
                entityId={entityId}
                {...this.props}
            />
        )
    }
}
