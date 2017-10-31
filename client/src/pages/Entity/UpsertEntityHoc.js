import React, { PureComponent } from 'react'

import AddEntityPage from './Add'
import EditEntityPage from './Edit'

export default class extends PureComponent {
    render() {
        const { match } = this.props
        const { entity, entityId } = match.params

        return !entityId ? (
            <AddEntityPage entityType={entity} {...this.props} />
        ) : (
            <EditEntityPage
                entityType={entity}
                entityId={entityId}
                {...this.props}
            />
        )
    }
}
